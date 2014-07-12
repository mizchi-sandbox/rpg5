Controller = Wdr.Controllers.Base.Controller
DungeonSelect = Wdr.UI.Components.DungeonSelect

module Wdr.Controllers
  class @DungeonSelectController extends Controller
    index: ->
      dungeonSelect = @reuse DungeonSelect
      dungeonSelect.$appendTo '#scene-root'
