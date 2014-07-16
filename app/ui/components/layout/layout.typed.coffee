Component = Wdr.UI.Components.Base.Component

module Wdr.UI.Components.Layout
  showHeader :: Boolean
  @Layout = Component.extend
    template: _cc ->
      header {
        class: 'debug-header',
        'v-show': 'showHeader',
        'v-transition': true
        }, ->
          a href:'/camp', 'Camp'
          button 'v-on':'click: clearStorages', '初期化'
      div id: 'wdr-container', ->
        div id: 'scene-root'

    methods:
      clearStorages: ->
        localforage.clear().then =>
          Warden.navigate('/')
          window.location.reload()

console.log _cc ->
  span 'v-transition': true, -> 'aaa'