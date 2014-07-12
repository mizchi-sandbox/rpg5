Controller = Wdr.Controllers.Base.Controller
Battle = Wdr.UI.Components.Battle

module Wdr.Controllers
  class @BattleController extends Controller
    index: ->
      battle = @reuse Battle
      battle.$appendTo '#scene-root'
