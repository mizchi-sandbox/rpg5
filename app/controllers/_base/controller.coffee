module Wdr.Controllers.Base
  class @Controller extends Warden.Controller
    beforeAction: ->
      # console.log 'before action'

    afterAction: ->
      # console.log 'after action'
