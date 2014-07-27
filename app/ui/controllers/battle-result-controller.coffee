Controller = require './_base/controller'
Battle = require '../components/battle-result/battle-result'

module.exports =
class BattleResultController extends Controller
  Controller.registerController 'BattleResult', @
  index: ->
    @vm = @reuse BattleResult
    @vm.$appendTo '#scene-root'
    @vm.on 'back', =>
      console.log 'battle result'
      if localStorage.resumePoint
        @navigate localStorage.resumePoint
      else
        @navigate 'camp'
