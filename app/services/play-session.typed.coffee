module Wdr.Services
  class @PlaySession
    gold :: Int
    name :: String
    saveId :: String
    constructor: () ->
      @gold = 0
