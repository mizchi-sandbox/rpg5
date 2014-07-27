Camp = require '../components/camp/camp'

module.exports =
class CampController extends Controllers.Base.Controller
  Controller.registerController 'Camp', @
  index: ->
    camp = @reuse Camp
    camp.$appendTo '#scene-root'
    camp.$data.playerName = wdr.currentSession.name
    camp.$data.gold = wdr.currentSession.gold
