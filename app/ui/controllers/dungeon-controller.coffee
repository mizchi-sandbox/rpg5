Controller = require './_base/controller'
Dungeon = require '../components/dungeon/dungeon'

createDummyDungeon = ->
  [
    [1, 1, 1, 1, 1, 1, 1]
    [1, 0, 0, 0, 0, 0, 1]
    [1, 0, 1, 1, 1, 0, 1]
    [1, 0, 0, 0, 1, 0, 1]
    [1, 0, 1, 1, 0, 0, 1]
    [1, 0, 1, 0, 0, 1, 1]
    [1, 1, 1, 1, 1, 1, 1]
  ]

module.exports =
class DungeonController extends Controller
  Controller.registerController 'Dungeon', @
  index: (req) ->
    @vm = @reuse Dungeon
    @vm.$appendTo '#scene-root'
    @vm.$data.name = req.name
    @vm.$data.cells = _.flatten createDummyDungeon()
    localStorage.resumePoint = location.hash

    @vm.on 'start-battle', =>
      wdr.context = {
        from: location.hash
        enemies: ['goblin']
      }
      @navigate 'battle'

    @vm.on 'back', =>
      @navigate 'camp'
