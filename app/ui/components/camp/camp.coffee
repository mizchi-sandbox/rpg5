Component = Wdr.UI.Components.Base.Component

module Wdr.UI.Components.Camp
  @Camp = Component.extend
    template: _cc ->
      h1 'Camp'
      text 'name: {{playerName}}'
      div 'gold: {{gold}}'

      ul class:'menu', ->
        li -> a href:'dungeon-select', -> 'ダンジョンへ'
        li -> a -> '装備'
        li -> a -> 'スキル'
        li -> a -> 'ショップ'
        li -> a href:'', 'ログアウト'
