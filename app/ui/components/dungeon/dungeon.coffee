Component = Wdr.UI.Components.Base.Component

module Wdr.UI.Components
  @Dungeon = Component.extend
    template: '''
    <h1>ダンジョン: {{name}}</h1>
    <button v-dispatcher='search'>探す</button>
    <button v-dispatcher='start-battle'>戦闘</button>
    '''