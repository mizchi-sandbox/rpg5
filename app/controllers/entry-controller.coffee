
module Wdr.Controllers
  class @EntryController extends Controllers.Base.Controller
    beforeAction: ->
      console.log 'before action'

    index: ->
      console.log 'index'

    afterAction: ->
      console.log 'after action'
