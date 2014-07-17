Controller = Wdr.Controllers.Base.Controller
Dungeon = Wdr.UI.Components.Dungeon

module Wdr.Controllers
  class @DungeonController extends Controller
    index: (req) ->
      dungeon = @reuse Dungeon
      dungeon.$appendTo '#scene-root'
      dungeon.$data.name = req.name

      localStorage.resumePoint = location.hash

      dungeon.on 'start-battle', =>
        wdr.context = {
          from: location.hash
          enemies: ['goblin']
        }
        @navigate 'battle'

