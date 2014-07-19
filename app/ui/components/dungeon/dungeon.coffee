Component = Wdr.UI.Components.Base.Component

module Wdr.UI.Components
  Cell = Component.extend
    template: _cc ->
      span '{{$index}}'

  @Dungeon = Component.extend
    components:
      cell: Cell

    template: _cc ->
      div class: 'dungeon-container', ->
        h1 'ダンジョン: {{name}}'
        button 'v-dispatcher':'search', '探す'
        button 'v-dispatcher':'start-battle', '戦闘'
        button 'v-dispatcher':'back', '戻る'

        # div class: 'map-container', ->
        #   span class:'cell', 'v-repeat': 'cells', 'v-component': 'cell'
