Controller = Wdr.Controllers.Base.Controller
BattleResult = Wdr.UI.Components.BattleResult

module Wdr.Controllers
  class @BattleResultController extends Controller
    index: ->
      @vm = @reuse BattleResult
      @vm.$appendTo '#scene-root'
      @vm.on 'back', =>
        console.log 'battle result'
        if localStorage.resumePoint
          @navigate localStorage.resumePoint
        else
          @navigate 'camp'
