Camp = Wdr.UI.Components.Camp.Camp

module Wdr.Controllers
  class @CampController extends Controllers.Base.Controller
    index: ->
      camp = @reuse Camp
      camp.$appendTo '#scene-root'
      camp.$data.playerName = wdr.currentSession.name
      camp.$data.gold = wdr.currentSession.gold
      camp.on 'debug-add-gold', =>
        camp.$data.gold = camp.$data.gold + 100


