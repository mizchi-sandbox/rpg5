localforage.setDriver('localStorageWrapper')

createDummySave = -> new Promise (done) ->
  Wdr.Storages.SaveObject.insert(
    name: 'mizchi'
    gold: 0
  ).then ([save]) =>
    Wdr.Storages.Actor.insert(
      ownerId: save.id
      name: 'mizchi'
      lv: 1
      job: 'novice'
      status:
        str: 10
        int: 10
        dex: 10
    ).then done

createCheatSave = -> new Promise (done) ->
  Wdr.Storages.SaveObject.insert(
    name: 'cheater'
    gold: 0
  ).then ([save]) =>
    Wdr.Storages.Actor.insert(
      ownerId: save.id
      name: 'cheater'
      lv: 100
      job: 'novice'
      status:
        str: 30
        int: 30
        dex: 30
    ).then done

initializeStorages = -> new Promise (done) ->
  Momic.Model.setup(
    name: 'wdr'
    collections:
      saves: {}
      actors: {}
  ).then =>
    return done() if localStorage.getItem('dbInitialized')?
    Promise.all([
      createDummySave()
      createCheatSave()
    ]).then =>
      localStorage.setItem('dbInitialized', 'initialized')
      done()

# wdr :: Wdr.Application
restoreLastSession = -> new Promise (done) ->
  Wdr.Storages.SaveObject.findOne(id: localStorage.currentPlayerId).then (saveObject :: Wdr.Storages.SaveObject) =>
    wdr.currentSession = Wdr.Application.createPlaySession(saveObject)
    done()

startRouter = ->
  Warden.replaceLinksToHashChange()
  Wdr.createRoutes new Warden

$ =>
  initializeStorages().then =>
    window.wdr = new Wdr.Application
    if localStorage.currentPlayerId
      restoreLastSession().then => startRouter()
    else
      startRouter()
