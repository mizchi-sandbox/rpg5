Controller = require './_base/controller'
DungeonSelect = require '../components/dungeon-select/dungeon-select'

module.exports =
class DungeonSelectController extends Controller
  Controller.registerController 'DungeonSelect', @
  index: ->
    dungeonSelect = @reuse DungeonSelect
    dungeonSelect.$appendTo '#scene-root'
