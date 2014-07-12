ValueWithMax = Wdr.ValueObjects.ValueWithMax

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

