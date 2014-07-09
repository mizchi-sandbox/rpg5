module Wdr
  class @Application
    @createPlaySession :: Wdr.Storages.SaveObject -> Any
    @createPlaySession: (saveObject :: Wdr.Storages.SaveObject) ->
      session = new Wdr.Services.PlaySession
      session.saveId = saveObject.id
      session.name = saveObject.name
      session.gold = saveObject.gold

    savePlaySession: ->

    constructor :: () -> Any

    currentSession :: Wdr.Services.PlaySession
    constructor: ->
