Component = Wdr.UI.Components.Base.Component

module Wdr.UI.Components.Camp
  @Camp = Component.extend
    template: _cc ->
      h1 'Camp'
      text 'name: {{playerName}}'

      div 'gold: {{gold}}'

      a href:'dungeon-select', -> 'ダンジョンへ'
      a href:'', 'ログアウト'

      button 'v-dispatcher':'debug-add-gold', -> 'add coin'
      button 'v-dispatcher':'save', 'save'
