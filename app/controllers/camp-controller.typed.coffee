Camp = Wdr.UI.Components.Camp.Camp

module Wdr.Controllers
  class @CampController extends Controllers.Base.Controller
    index: ->
      camp = @reuse Camp
      camp.$appendTo '#scene-root'
      camp
