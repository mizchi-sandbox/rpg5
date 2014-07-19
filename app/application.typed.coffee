module Wdr
  class @Application
    currentSession :: Wdr.Services.PlaySession
    loadPlaySession :: Wdr.Storages.SaveObject -> Any
    loadPlaySession: (saveObject :: Wdr.Storages.SaveObject) => new Promise (done) =>
      @currentSession = new Wdr.Services.PlaySession
      @currentSession.saveId = saveObject.id
      @currentSession.name = saveObject.name
      @currentSession.gold = saveObject.gold
      Wdr.Storages.Actor.find(ownerId: saveObject.id).then (actors) =>
        @currentSession.actors = actors.map (actor) => new Wdr.Entities.Actor actor
        @loaded = true
        done()

    savePlaySession: ->
    constructor :: () -> Any
    constructor: ->
      @events = []
      