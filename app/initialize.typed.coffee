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

wdr :: Wdr.Application

$ =>
  localforage.clear()
  .then => initializeStorages()
  .then =>
    window.wdr = new Wdr.Application
    Wdr.createRoutes new Warden
    # router = new Warden
    # router.match '', 'Entry#index'
    # router.match 'camp', 'Camp#index'
    Warden.replaceLinksToHashChange()
