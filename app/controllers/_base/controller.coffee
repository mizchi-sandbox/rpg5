Layout = Wdr.UI.Components.Layout.Layout

module Wdr.Controllers.Base
  class @Controller extends Warden.Controller
    beforeAction: ->
      @layout = @reuse Layout
      @layout.$appendTo 'body'
      @layout.$data.showHeader = true

Warden::findController = (controllerName) ->
  Wdr.Controllers[controllerName+'Controller']

