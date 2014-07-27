module Wdr.Services
  class @BattleSession
    constructor: ->
      @players = [
        Wdr.Entities.Battle.Battler.create {name: 'mizchi', lv: 1, hp: 30, wt: 10, id: 1}
        Wdr.Entities.Battle.Battler.create {name: 'bot', lv: 3, hp: 20, wt: 30, id: 2}
      ]
      @enemies = [
        Wdr.Entities.Battle.Battler.create {name: 'goblin#1', lv: 1, wt:15, hp: 12, id: 3}
        Wdr.Entities.Battle.Battler.create {name: 'goblin#2', lv: 1, wt:15, hp: 12, id: 4}
        Wdr.Entities.Battle.Battler.create {name: 'goblin#3', lv: 1, wt:15, hp: 12, id: 5}
      ]

    # findBattlerById :: String -> Wdr.Entities.Battle.Battler?
    findBattlerById: (battlerId) ->
      _.find [].concat(@players, @enemies), (battler) => battler.id is battlerId

    execAction: ({actorId, skillId, targetId}) ->
      targetId ?= _.sample(@enemies).id # TODO
      actor = @findBattlerById(actorId)
      if skillId is 'attack'
        target = @findBattlerById(targetId)
        target.hp.current -= 4
        console.log 'attack'
      else if skillId is 'defenece'
        console.log 'defenece'

      else if skillId is 'escape'
        console.log 'escape'

      actor.wt.current = 1

    isBattleFinisihed: ->
      if _.all @enemies.map (e) -> e.hp.current <= 0
        {eventType: 'player-win'}
      else if _.all @enemies.map (e) -> e.hp.current <= 0
        {eventType: 'enemy-win'}
      else
        false

    processTurn: -> new Promise (done) =>
      if result = @isBattleFinisihed()
        done([result])

      reports = [ ]
      for p in [].concat(@players, @enemies)
        continue if p.hp.current < 1

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