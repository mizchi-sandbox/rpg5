Component = Wdr.UI.Components.Base.Component

module Wdr.UI.Components.Layout
  @Layout = Component.extend
    template: _cc ->
      header 'v-show': 'showHeader', ->
        a href:'/camp', 'Camp'
        button 'v-on':'click: clearStorages', '初期化'
      div id: 'scene-root'

    methods:
      clearStorages: ->
        localforage.clear().then =>
          Warden.navigate('/')
          window.location.reload()

