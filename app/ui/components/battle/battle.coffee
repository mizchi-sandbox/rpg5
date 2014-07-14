Component = Wdr.UI.Components.Base.Component

# struct Battle.Skill
#   name :: String
Skill = Component.extend
  template: _t '''
    button(v-on='click: onClick(this)') {{name}}
  '''
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
  template: _t '''
    div
      | lv.{{lv}} : {{name}}
      | HP: {{hp.current}}/{{hp.max}}
      | wt: {{wt.current}}/{{wt.max}}
  '''

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
  template: _t '''
    button(v-on='click: onClick(this)') {{name}}
    | HP: {{hp.current}}/{{hp.max}}
  '''
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
    template: _t '''

    h3 Players
    ul.players
      li(v-repeat='players' v-component='battler')

    h3 Enemies
    ul.enemies
      li(v-repeat='enemies' v-component='battler')

    div(v-show='onUserInput')
      div(v-show='inputState == "skill-select"')
        h3 SkillSelector
        ul.skills
          li(v-repeat='skills' v-component='skill')

      div(v-show='inputState == "target-select"')
        h3 TargetSelector
        ul.targets
          li(v-repeat='targets' v-component='target')
          li
            button(v-dispatcher='back-to-skill-select') 戻る

    h3 Log
    ul.logs
      li(v-repeat='log')
        {{message}}
    '''
