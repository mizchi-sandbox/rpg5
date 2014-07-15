Component = Wdr.UI.Components.Base.Component

module Wdr.UI.Components
  @Dungeon = Component.extend
    template: _cc ->
      h1 'ダンジョン: {{name}}'
      button 'v-dispatcher':'search', '探す'
      button 'v-dispatcher':'start-battle', '戦闘'
