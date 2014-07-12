Component = Wdr.UI.Components.Base.Component

Skill = Component.extend
  template:'''
    <button v-on='click: onClick(this)'>{{name}}</span>
  '''
  methods:
    onClick: ->
      @$dispatch 'skill-selected', @$data.skillId

Battler = Component.extend
  template:'''
    <div>
      lv.{{lv}} : {{name}}
      HP: {{hp.current}}/{{hp.max}}
      wt: {{wt.current}}/{{wt.max}}
    </div>
  '''

module Wdr.UI.Components
  @Battle = Component.extend
    components:
      battler: Battler
      skill: Skill
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
      <h2>SkillSelector</h2>
      <ul class='skills'>
        <li v-repeat='skills' v-component='skill'></li>
      </ul>
    </div>

    <h2>Log</h2>
    <ul class='logs'>
      <li v-repeat='log'>
        {{message}}
      </li>
    </ul>
    '''
