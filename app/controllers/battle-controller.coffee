Controller = Wdr.Controllers.Base.Controller
Battle = Wdr.UI.Components.Battle

struct UserInput
  actorId :: String
  skillId :: String
  targetId :: String?

module Wdr.Controllers
  class @BattleController extends Controller
    index: ->
      @battle = battle = @reuse Battle
      @battle.$appendTo '#scene-root'
      @session = new Wdr.Services.BattleSession

      @battle.$data = @session.toJSON()
      @battle.$data.log = [message: '開始']
      @battle.$data.onUserInput = false
      @battle.$data.skills = [
        {name: '攻撃', skillId:'attack'}
        {name: '防御', skillId:'defenece'}
      ]
      setTimeout => # Avoid action before fixed
        @startGameLoop()

    waitUserInput: (actorId) -> new Promise (done) =>
      console.log 'now process are waiting for user input', actorId
      @log '入力を待っています...'
      @battle.$on 'skill-selected', (skillId, targetId = null) =>
        @battle.$off('skill-selected')
        done({actorId, skillId, targetId})

    log: (message) ->
      console.log message
      @battle.$data.log.unshift message: message
      if @battle.$data.log.length > 5
        @battle.$data.log.pop()

    processReport: (p, report) => new Promise (done) => p.then =>
      setTimeout (=>
        switch report.eventType
          when 'action'
            @log report.log if report.log
            done()

          when 'stopForUserInput'
            @battle.$data.onUserInput = true
            @waitUserInput(report.battlerId).then (userInput :: UserInput) =>
              @session.execAction userInput
              @sync()
              @battle.$data.onUserInput = false
              done()
          else
            throw 'unknown event type:'+report.eventType
      ), 50

    sync: =>
      for battlerVM in [].concat @battle.$data.players, @battle.$data.enemies
        battler = @session.findBattlerById(battlerVM.id)
        battlerVM.wt.current = battler.wt.current
        battlerVM.hp.current = battler.hp.current

    startGameLoop: =>
      do update = =>
        @session.processTurn().then (reports) =>
          reports.reduce(@processReport, Promise.resolve())
          .then =>
            setTimeout (=>
              @sync()
              update()
            ), 50
