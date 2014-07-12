localforage.setDriver('localStorageWrapper')

initializeStorages = -> new Promise (done) ->
  Momic.Model.setup(
    name: 'wdr'
    collections:
      saves: {}
  ).then =>
    if localStorage.getItem('dbInitialized')?
      done()
    else
      Wdr.Storages.SaveObject.insert([
        {name: 'mizchi', gold: 0}
        {name: 'smurph', gold: 100000}
      ]).then =>
        localStorage.setItem('dbInitialized', 'initialized')
        done()

# wdr :: Wdr.Application
restoreLastSession = ->

startRouter = ->
  Warden.replaceLinksToHashChange()
  Wdr.createRoutes new Warden

$ =>
  # localforage.clear().then =>
    initializeStorages().then =>
      window.wdr = new Wdr.Application
      if localStorage.currentPlayerId
        Wdr.Storages.SaveObject.findOne(id: localStorage.currentPlayerId).then (saveObject :: Wdr.Storages.SaveObject) =>
          wdr.currentSession = Wdr.Application.createPlaySession(saveObject)
          Warden.navigate('camp')
          startRouter()
      else
        startRouter()
