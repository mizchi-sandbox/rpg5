module Wdr
  class @Application
    currentSession :: Wdr.Services.PlaySession

    @createPlaySession :: Wdr.Storages.SaveObject -> Any

    @createPlaySession: (saveObject :: Wdr.Storages.SaveObject) -> new Promise (done) ->
      session :: Any = new Wdr.Services.PlaySession
      session.saveId = saveObject.id
      session.name = saveObject.name
      session.gold = saveObject.gold
      session
      done(session)

    loadPlaySession: (saveObject :: Wdr.Storages.SaveObject) => new Promise (done) =>
      @currentSession = new Wdr.Services.PlaySession
      @currentSession.saveId = saveObject.id
      @currentSession.name = saveObject.name
      @currentSession.gold = saveObject.gold
      @loaded = true
      done()

    savePlaySession: ->

    constructor :: () -> Any

    constructor: ->
