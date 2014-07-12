Component = Wdr.UI.Components.Base.Component

module Wdr.UI.Components.Camp
  @Camp = Component.extend
    template: '''
    <h1>Camp</h1>
    <div>
      name: {{playerName}}
    </div>

    <div>
      gold: {{gold}}
    </div>

    <button v-dispatcher='debug-add-gold'>add coin</button>
    '''