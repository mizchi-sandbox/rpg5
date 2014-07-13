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

    <a href='dungeon-select'>ダンジョンへ</a>
    <a href=''>ログアウト</a>

    <button v-dispatcher='debug-add-gold'>add coin</button>
    <button v-dispatcher='save'>save</button>
    '''