Component = Wdr.UI.Components.Base.Component

module Wdr.UI.Components.Layout
  @Layout = Component.extend
    template: '''
    <header v-show='showHeader'>
      <a href='/camp'>Camp</a>
      <button v-on='click: clearStorages'>初期化</button>
    </header>
    <div id='scene-root'></div>
    '''

    methods:
      clearStorages: ->
        localforage.clear().then =>
          Warden.navigate('/')
          window.location.reload()

