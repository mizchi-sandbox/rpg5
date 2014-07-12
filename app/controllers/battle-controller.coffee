Controller = Wdr.Controllers.Base.Controller
Battle = Wdr.UI.Components.Battle

ValueWithMax = Wdr.ValueObjects.ValueWithMax

module Wdr.ValueObjects
  class @Report
    eventType :: String
    log :: String
    battlerId :: String
    constructor: ({@eventType, @log, @battlerId}) ->

module Wdr.Entities.Battle
  class @Battler extends Wdr.Entities.Base.Entity
    name :: String
    lv :: Int
    hp :: Wdr.ValueObjects.ValueWithMax
    wt :: Wdr.ValueObjects.ValueWithMax

    constructor: ({@name, @lv, hp, wt, @id})->
      @hp = new Wdr.ValueObjects.ValueWithMax hp, hp
      @wt = new Wdr.ValueObjects.ValueWithMax 0, wt

    toJSON: ->
      {
        @name,
        @id,
        @lv,
        wt:
          current: @wt.current
          max: @wt.max
        hp:
          current: @hp.current
          max: @hp.max
      }

module Wdr.Services
  class @BattleSession
    constructor: ->
      @players = [
        new Wdr.Entities.Battle.Battler {name: 'mizchi', lv: 1, hp: 30, wt: 10, id: 1}
        new Wdr.Entities.Battle.Battler {name: 'bot1', lv: 3, hp: 20, wt: 30, id: 2}
      ]
      @enemies = [
        new Wdr.Entities.Battle.Battler {name: 'goblin#1', lv: 1, wt:15, hp: 12, id: 3}
        new Wdr.Entities.Battle.Battler {name: 'goblin#2', lv: 1, wt:15, hp: 12, id: 4}
        new Wdr.Entities.Battle.Battler {name: 'goblin#3', lv: 1, wt:15, hp: 12, id: 5}
      ]

    # findBattlerById :: String -> Wdr.Entities.Battle.Battler?
    findBattlerById: (battlerId) ->
      _.find [].concat(@players, @enemies), (battler) => battler.id is battlerId

    processTurn: -> new Promise (done) =>
      reports = []
      for p in [].concat(@players, @enemies)
        if p.wt.current < p.wt.max
          p.wt.current++
          # reports.push new Wdr.ValueObjects.Report
          #   eventType: 'action'
          #   log: "#{p.name}は力をためた: #{p.wt.current-1} -> #{p.wt.current}"
          #   battlerId: p.id
        else
          if p in @players
            reports.push new Wdr.ValueObjects.Report
              eventType: 'stopForUserInput'
              log: "#{p.name}は入力を待っている"
              battlerId: p.id
            break
          else
            p.wt.current = 0
            reports.push new Wdr.ValueObjects.Report
              eventType: 'action'
              log: "#{p.name}の行動"
              battlerId: p.id
      done(reports)

    toJSON: ->
      players: @players.map (p) -> p.toJSON()
      enemies: @enemies.map (e) -> e.toJSON()

struct UserInput
  actorId :: String
  skillId :: String
  targetId :: String?

module Wdr.Controllers
  class @BattleController extends Controller
    waitUserSelect: (actorId) -> new Promise (done) =>
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
            @waitUserSelect(report.battlerId).then (userInput :: UserInput) =>
              actor = @session.findBattlerById(userInput.actorId)
              actor.wt.current = 0
              @battle.$data.onUserInput = false
              done()
          else
            throw 'unknown event type:'+report.eventType
      ), 50

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
