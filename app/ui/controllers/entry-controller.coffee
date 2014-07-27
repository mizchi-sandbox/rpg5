Controller = require './_base/controller'
Entry = require '../components/layout/layout'

module.exports =
class EntryController extends Controllers.Base.Controller
  Controller.registerController 'Entry', @
  index: -> new Promise (done) =>
    @layout.$data.showHeader = false

    delete localStorage.currentPlayerId
    entry = @reuse(Entry)
    Wdr.Storages.SaveObject.find().then (saveObjects) =>
      entry.$data.saveObjects = _.clone saveObjects
      entry.$appendTo '#scene-root'
      done()

    entry.on 'game-selected', (saveObject) =>
      wdr.loadPlaySession(saveObject).then =>
        localStorage.currentPlayerId = saveObject.id
        @navigate 'camp'
