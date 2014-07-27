Layout = require '../../components/layout/layout'

module.exports = class Controller extends Warden.Controller
  @registerController: (name, instance) ->
    @_registered ?= {}
    @_registered[name] = instance

  @getController: (name) -> @_registered?[name]

  beforeAction: ->
    @layout = @reuse Layout
    @layout.$appendTo 'body'
    @layout.$data.showHeader = true

Warden::findController = (controllerName) ->
  Controller.getController(controllerName)

