Component = Wdr.UI.Components.Base.Component

module Wdr.UI.Components.Entry
  @Entry = Component.extend
    template: _cc ->
      div class:'entry-container', ->
        h1 'RPG(仮) proto5'
        hr()
        h2 '冒険を始める'
        ul class: 'save-data-list', ->
          li 'v-repeat':'saveObjects', ->
            span class: 'text', 'データ{{$index}}:'
            span class: 'text', '{{name}}'
            span class: 'text', '${{gold}}'
            button 'v-on': 'click:selectGame(this)', 'はじめる'
        p '''
          注意: mizchiが開発しているRPGのプロトタイプです。予告なくデータの互換性が壊れることがあります。
        '''

    attached: ->
      console.log 'attached'
      # $(@$el).velocity({opcaity:0}, {opacity: 1}, 1000)
      @$j('h1').css opacity: 0
      @$j('h1').velocity {opacity: 1}, 1000

    methods:
      selectGame: (saveObject) ->
        @$dispatch 'game-selected', saveObject
