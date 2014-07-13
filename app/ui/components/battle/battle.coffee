Component = Wdr.UI.Components.Base.Component

# struct Battle.Skill
#   name :: String

Skill = Component.extend
  template:'''
    <button v-on='click: onClick(this)'>{{name}}</span>
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
  template:'''
    <div>
      lv.{{lv}} : {{name}}
      HP: {{hp.current}}/{{hp.max}}
      wt: {{wt.current}}/{{wt.max}}
    </div>
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
  template:'''
    <button v-on='click: onClick(this)'>{{name}}</span>
    <span>HP: {{hp.current}}/{{hp.max}}</span>
  '''
  methods:
    onClick: ->
      @$dispatch 'target-selected', @$data.id

module Wdr.UI.Components
  @Battle = Component.extend
    components:
      battler: Battler
      skill: Skill
      target: Target
    template: '''
    <h2>Players</h2>

    <ul class='players'>
      <li v-repeat='players' v-component='battler'></li>
    </ul>

    <h2>Enemies</h2>

    <ul class='enemies'>
      <li v-repeat='enemies' v-component='battler'></li>
    </ul>

    <div v-show='onUserInput'>
      <div v-show='inputState == "skill-select"'>
        <h2>SkillSelector</h2>
        <ul class='skills'>
          <li v-repeat='skills' v-component='skill'></li>
        </ul>
      </div>

      <div v-show='inputState == "target-select"'>
        <h2>TargetSelector</h2>
        <ul class='targets'>
          <li v-repeat='targets' v-component='target'></li>
        </ul>
      </div>
    </div>

    <h2>Log</h2>
    <ul class='logs'>
      <li v-repeat='log'>
        {{message}}
      </li>
    </ul>
    '''
