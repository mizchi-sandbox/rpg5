# module Wdr.Entities
#   class @Player extends Wdr.Entities.Base.Entity

# module.exports = class Player
module Wdr.Entities
  class @Player extends Wdr.Entities.Base.Entity
    constructor: (data) ->
      @name = data.name
      @gold = data.gold

    save: ->
      db.players.update({@id, @name, @lv, @gold})

    toJSON: ->
      {@id, @name, @lv, @gold}

    # -> Boolean
    canPuchaseExtendables: (extendableId, count = 1) ->
      extendableData = ExtendablesData[extendableId]
      @gold >= extendableData.value * count

    # (ID, [count]) -> Promise()
    purchaseExtendables: (extendableId, count = 1) -> new Promise (done) =>
      data = ExtendablesData[extendableId]
      @gold -= data.value * count
      @save().then =>
        db.extendables.findOne(extendableId: data.extendableId, playerId: player.id).then (owned) =>
          if owned?
            owned.amount += count
            db.extendables.update(owned).then => done()
          else
            stuff =
              extendableId: data.extendableId
              playerId: player.id
              amount: count
            db.extendables.insert(stuff).then => done()
