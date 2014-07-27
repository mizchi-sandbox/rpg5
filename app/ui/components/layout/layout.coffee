Component = require '../_base/component'

module.exports = Layout = Component.extend
  template: _cc ->
    div id: 'wdr-container', ->
      div id: 'scene-root'
    header {
      class: 'debug-header',
      'v-show': 'showHeader',
      'v-transition': true
      }, ->
        text 'debug'
        button 'v-on':'click: toCamp', 'キャンプへ'
        button 'v-on':'click: addGold', -> 'ゴールド増加'
        button 'v-on':'click: save', 'save'
        button 'v-on':'click: clearStorages', '初期化'

  methods:
    toCamp: ->
      Warden.navigate('camp')

    clearStorages: ->
      localforage.clear().then =>
        Warden.navigate('/')
        window.location.reload()

    addGold: ->
      wdr.currentSession.gold += 100

    save: ->
      wdr.currentSession.save().done =>
        console.log 'save done'

