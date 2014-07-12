module Wdr
  class @Application
    currentSession :: Wdr.Services.PlaySession
    @createPlaySession :: Wdr.Storages.SaveObject -> Any
    @createPlaySession: (saveObject :: Wdr.Storages.SaveObject) ->
      session :: Any = new Wdr.Services.PlaySession
      session.saveId = saveObject.id
      session.name = saveObject.name
      session.gold = saveObject.gold
      session

    savePlaySession: ->

    constructor :: () -> Any
    constructor: ->
