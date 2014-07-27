Component = require '../_base/component'
module.exports = BattleResult = Component.extend
  created: -> console.log 'battle result created'
  data:
    gold: 50
    exp: 20
    rewards: [
      {itemName: '薬草'}
      {itemName: '鉄鉱石'}
    ]
  template: _cc ->
    h2 'You win'
    p ->
      span '獲得ゴールド: {{gold}}'
    p ->
      span '獲得経験値: {{exp}}'
    ul ->
      li 'v-repeat': 'rewards', ->
        span '{{itemName}}'
    button 'v-on': 'click: back', '戻る'

  methods:
    back: ->
      @$dispatch 'back'
