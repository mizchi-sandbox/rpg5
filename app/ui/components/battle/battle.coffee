Component = Wdr.UI.Components.Base.Component

# struct Battle.Skill
#   name :: String
Skill = Component.extend
  template: _cc ->
    button 'v-on': 'click: onClick(this)', '{{name}}'

  methods:
    onClick: ->
      @$dispatch 'skill-selected', @$data.skillId

# struct Battle.Battler
#   lv :: Int
#   name :: String
#   hp ::
#     current :: Int
#     max :: Int
#   wt ::
#     current :: Int
#     max :: Int

Battler = Component.extend
  template: _cc ->
    div class: 'battler', ->
      span 'lv.{{lv}} : {{name}}'
      span 'HP: {{hp.current}}/{{hp.max}}'
      span 'wt: {{wt.current}}/{{wt.max}}'

# struct Battle.Target
#   lv :: Int
#   id :: String
#   name :: String
#   hp ::
#     current :: Int
#     max :: Int
#   wt ::
#     current :: Int
#     max :: Int
Target = Component.extend
  template: _cc ->
    button 'v-on':'click: onClick(this)', ->
      text '{{name}}:HP:{{hp.current}}/{{hp.max}}'

  methods:
    onClick: ->
      @$dispatch 'target-selected', @$data.id

# Dispatchable Events
#   target-selected
#   skill-selected
module Wdr.UI.Components
  @Battle = Component.extend
    components:
      battler: Battler
      skill: Skill
      target: Target

    template: _cc ->
      div class: 'battle-container', ->
        ul class: 'players', ->
          li 'v-repeat':'players', 'v-component':'battler'

        ul class: 'enemies', ->
          li 'v-repeat':'enemies', 'v-component':'battler'

        div class:'user-controller', 'v-show':'onUserInput', ->
          div 'v-show': "inputState == \'skill-select\'", ->
            ul class: 'skills', ->
              li 'v-repeat':'skills', 'v-component':'skill'

          div 'v-show': "inputState == \'target-select\'", ->
            ul class: 'targets', ->
              li 'v-repeat':'targets', 'v-component':'target'
              li ->
                button 'v-dispatcher':'back-to-skill-select', -> '戻る'

        h3 'Log'
        ul class: 'logs', ->
          li 'v-repeat':'log', -> '{{message}}'
