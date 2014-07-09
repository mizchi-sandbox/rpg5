Component = Wdr.UI.Components.Base.Component

module Wdr.UI.Components.Entry
  @Entry = Component.extend
    template: '''
    <h1>冒険を始める</h1>
    <ul>
      <li v-repeat='saveObjects'>
        {{name}} / gold: {{gold}}
        <button v-on='click:selectGame(this)'>はじめる</button>
      </li>
    </ul>
    '''

    methods:
      selectGame: (saveObject) ->
        @$dispatch 'game-selected', saveObject
