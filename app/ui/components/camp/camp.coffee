Component = require '../_base/component'

# module Wdr.UI.Components.Camp
module.exports = Camp = Component.extend
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
