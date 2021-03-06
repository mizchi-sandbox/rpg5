require './utils'
require './ui/controllers/battle-controller'
require './ui/controllers/battle-result-controller'
require './ui/controllers/camp-controller'
require './ui/controllers/dungeon-controller'
require './ui/controllers/dungeon-select-controller'
require './ui/controllers/entry-controller'
routes = require './routes'

localforage.setDriver('localStorageWrapper')
window.addEventListener "mousedown", ((e) -> e.preventDefault()), false
window.addEventListener "mousemove", ((e) -> e.preventDefault()), false
window.addEventListener "mouseup", ((e) -> e.preventDefault()), false
window.addEventListener "touchstart", ((e) -> e.preventDefault()), false
window.addEventListener "touchmove", ((e) -> e.preventDefault()), false
window.addEventListener "touchend", ((e) -> e.preventDefault()), false

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
    ).then ([member]) =>
      save.partyMemberIds = [member.id]
      save.save().then => done()

createCheatSave = -> new Promise (done) ->
  Wdr.Storages.SaveObject.insert(
    name: 'cheater'
    gold: 100000
  ).then ([save]) =>
    Wdr.Storages.Actor.insert(
      ownerSaveId: save.id
      name: 'cheater'
      lv: 100
      job: 'novice'
      status:
        str: 30
        int: 30
        dex: 30
    ).then ([member]) =>
      save.partyMemberIds = [member.id]
      save.save().then => done()

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
  Wdr.Storages.SaveObject.findOne(id: localStorage.currentPlayerId).then (saveObject) =>
    wdr.loadPlaySession(saveObject).then => done()

startRouter = ->
  Warden.replaceLinksToHashChange()
  routes(new Warden)

$ =>
  $('body').empty()
  FastClick.attach(document.body)
  initializeStorages().then =>
    window.wdr = new Wdr.Application
    if localStorage.currentPlayerId
      restoreLastSession().then => startRouter()
    else
      startRouter()

