Controller = Wdr.Controllers.Base.Controller
Dungeon = Wdr.UI.Components.Dungeon

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

module Wdr.Controllers
  class @DungeonController extends Controller
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
