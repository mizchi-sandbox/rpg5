Component = Wdr.UI.Components.Base.Component

module Wdr.UI.Components
  @DungeonSelect = Component.extend
    template: _cc ->
      ul ->
        li 'v-repeat': 'dungeons', ->
          a href: 'dungeons/{{href}}', '{{name}}'

    data:
      dungeons: [
        {
          name: 'チュートリアルステージ'
          href: 'tutorial'
        }
      ]