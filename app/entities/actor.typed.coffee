module Wdr.Entities
  class @Actor extends Wdr.Entities.Base.Entity
    name :: String
    lv :: Int
    job :: String
    status ::
      str :: Int
      int :: Int
      dex :: Int
    constructor: ({@name, @lv, @job, @status}) ->
