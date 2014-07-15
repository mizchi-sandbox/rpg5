Component = Wdr.UI.Components.Base.Component

module Wdr.UI.Components.Entry
  @Entry = Component.extend
    template: _cc ->
      h1 '冒険を始める'
      ul ->
        li 'v-repeat':'saveObjects', ->
          '{{name}} / gold: {{gold}}'
          button 'v-on': 'click:selectGame(this)', -> 'はじめる'

    methods:
      selectGame: (saveObject) ->
        @$dispatch 'game-selected', saveObject
