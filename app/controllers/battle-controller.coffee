Controller = Wdr.Controllers.Base.Controller
Battle = Wdr.UI.Components.Battle

module Wdr.Controllers
  struct UserInput
    actorId :: String
    skillId :: String
    targetId :: String?

  struct Skill
    name :: String
    skillId :: String

  struct BattleData
    onUserInput :: Boolean
    log :: String[]
    skills :: Skills[]
    players :: Wdr.Entities.Battle.Battler[]
    enemies :: Wdr.Entities.Battle.Battler[]

  class @BattleController extends Controller
    index: ->
      @vm = battle = @reuse Battle
      @vm.$appendTo '#scene-root'
      @session = new Wdr.Services.BattleSession

      @vm.$data = @session.toJSON()
      @vm.$data.log = [message: '開始']
      @vm.$data.onUserInput = false
      setTimeout => # Avoid action before fixed
        @startGameLoop()

    # waitUserInput :: String -> Promise<Any>
    waitUserInput: (actorId) -> new Promise (done) =>
      UserInputStory = Libretto.extend
        steps:
          'start': 'waitSkillSelect'
          'waitSkillSelect': ['waitTargetSelect', 'end']
          'waitTargetSelect': ['waitSkillSelect', 'end']

        waitSkillSelect: (userInputContext) => new Promise (done) =>
          @vm.$data.inputState = 'skill-select'
          getSkills = -> [
            {name: '攻撃', skillId:'attack',   targetType: 'single'}
            {name: '防御', skillId:'defenece', targetType: 'none'}
            {name: '逃走', skillId:'escape',   targetType: 'none'}
          ]

          @vm.$data.skills = getSkills()

          @vm.$on 'skill-selected', (skillId) =>
            @vm.$off('skill-selected')

            skills = getSkills()
            skill = _.find skills, {skillId}
            userInputContext.skillId = skill.skillId

            switch skill.targetType
              when 'single'
                done('waitTargetSelect')
              when 'none'
                done('end')

        waitTargetSelect: (userInputContext) => new Promise (done) =>
          @vm.$data.inputState = 'target-select'
          @vm.$data.targets =
            @session.enemies
            .map((e) -> e.toJSON())
            .filter((e) -> e.hp.current > 0)

          @vm.$waitAnyOnce
            'target-selected': (targetId) =>
              userInputContext.targetId = targetId
              done('end')

            'back-to-skill-select': =>
              done('waitSkillSelect')

      @log '入力を待っています...'
      new UserInputStory().ready().then (context) =>
        context.actorId = actorId
        done(context)

    # log :: String -> ()
    log: (message) ->
      console.log message
      @vm.$data.log.unshift message: message
      if @vm.$data.log.length > 5
        @vm.$data.log.pop()

    # processReport :: Promise<Any> * Report -> ()
    processReport: (p, report) => new Promise (done, reject) => p.then =>
      setTimeout (=>
        switch report.eventType
          when 'player-win'
            @stopped = true
            reject()
          when 'enemy-win'
            @stopped = true
            reject()

          when 'action'
            @log report.log if report.log
            done()

          when 'stopForUserInput'
            @vm.$data.onUserInput = true
            @waitUserInput(report.battlerId).then (userInput :: UserInput) =>
              @session.execAction userInput
              @sync()
              @vm.$data.onUserInput = false
              done()
          else
            throw 'unknown event type:'+report.eventType
      ), 50

    # sync :: () -> ()
    sync: =>
      for battlerVM in [].concat @vm.$data.players, @vm.$data.enemies
        battler = @session.findBattlerById(battlerVM.id)
        battlerVM.wt.current = battler.wt.current
        battlerVM.hp.current = battler.hp.current

    # startGameLoop :: () -> ()
    startGameLoop: =>
      do update = =>
        @session.processTurn().then (reports) =>
          reports.reduce(@processReport, Promise.resolve())
          .then (=>
            setTimeout (=>
              @sync()
              update()
            ), 50
          ), =>
            @end()

    end: ->
      @navigate 'battle-result'
      # if localStorage.resumePoint
      #   # @navigate localStorage.resumePoint
      #   @navigate 'battle-result'
      # else
      #   @navigate 'camp'
