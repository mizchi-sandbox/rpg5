{SaveObject} = Wdr.Storages
initializeStorages = -> new Promise (done) ->
  Momic.Model.setup(
    name: 'wdr'
    collections:
      saves: {}
  ).then done

Warden::findController = (controllerName) ->
  Wdr.Controllers[controllerName+'Controller']

$ =>
  localforage.clear()
  .then => initializeStorages()
  .then =>
    saveObject = new SaveObject
    saveObject.name = 'mizchi'
    saveObject.gold = 0

    saveObject.save().then =>
      console.log 'save done!'
      SaveObject.find().then (saveObjects) =>
        console.log saveObjects

  router = new Warden
  router.match '', 'Entry#index'
