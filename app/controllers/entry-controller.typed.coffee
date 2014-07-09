Entry = Wdr.UI.Components.Entry.Entry

module Wdr.Controllers
  class @EntryController extends Controllers.Base.Controller
    index: -> new Promise (done) =>
      entry = @reuse(Entry)
      Wdr.Storages.SaveObject.find().then (saveObjects) =>
        entry.$data.saveObjects = saveObjects
        entry.$appendTo '#scene-root'
        done()

      entry.on 'game-selected', (saveObject :: Wdr.Storages.SaveObject) =>
        wdr.currentSession = Wdr.Application.createPlaySession(saveObject)
        @navigate 'camp'

