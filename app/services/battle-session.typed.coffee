module Wdr.Services
  class @BattleSession
    constructor: ->
      @players = [
        new Wdr.Entities.Battle.Battler {name: 'mizchi', lv: 1, hp: 30, wt: 10, id: 1}
        new Wdr.Entities.Battle.Battler {name: 'bot', lv: 3, hp: 20, wt: 30, id: 2}
      ]
      @enemies = [
        new Wdr.Entities.Battle.Battler {name: 'goblin#1', lv: 1, wt:15, hp: 12, id: 3}
        new Wdr.Entities.Battle.Battler {name: 'goblin#2', lv: 1, wt:15, hp: 12, id: 4}
        new Wdr.Entities.Battle.Battler {name: 'goblin#3', lv: 1, wt:15, hp: 12, id: 5}
      ]

    # findBattlerById :: String -> Wdr.Entities.Battle.Battler?
    findBattlerById: (battlerId) ->
      _.find [].concat(@players, @enemies), (battler) => battler.id is battlerId

    execAction: ({actorId, skillId, targetId}) ->
      targetId ?= _.sample(@enemies).id # TODO
      actor = @findBattlerById(actorId)
      if skillId is 'attack'
        target = @findBattlerById(targetId)
        target.hp.current--
        console.log 'attack'
      else if skillId is 'defenece'
        console.log 'defenece'

      actor.wt.current = 1

    processTurn: -> new Promise (done) =>
      reports = []
      for p in [].concat(@players, @enemies)
        if p.wt.current < p.wt.max
          p.wt.current++
        else
          if p in @players
            reports.push new Wdr.ValueObjects.Report
              eventType: 'stopForUserInput'
              log: "#{p.name}は入力を待っている"
              battlerId: p.id
          else
            p.wt.current = 1
            reports.push new Wdr.ValueObjects.Report
              eventType: 'action'
              log: "#{p.name}の行動"
              battlerId: p.id

      done(reports)

    toJSON: ->
      players: @players.map (p) -> p.toJSON()
      enemies: @enemies.map (e) -> e.toJSON()

