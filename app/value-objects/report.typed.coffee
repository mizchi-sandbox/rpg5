module Wdr.ValueObjects
  class @Report
    eventType :: String
    log :: String
    battlerId :: String
    constructor: ({@eventType, @log, @battlerId}) ->

