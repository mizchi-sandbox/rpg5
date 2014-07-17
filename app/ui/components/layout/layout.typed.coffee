Component = Wdr.UI.Components.Base.Component

module Wdr.UI.Components.Layout
  showHeader :: Boolean
  @Layout = Component.extend
    template: _cc ->
      div id: 'wdr-container', ->
        div id: 'scene-root'
      header {
        class: 'debug-header',
        'v-show': 'showHeader',
        'v-transition': true
        }, ->
          a href:'/camp', 'Camp'
          button 'v-on':'click: clearStorages', '初期化'

    methods:
      clearStorages: ->
        localforage.clear().then =>
          Warden.navigate('/')
          window.location.reload()

console.log _cc ->
  span 'v-transition': true, -> 'aaa'