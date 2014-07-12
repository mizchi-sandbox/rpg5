Component = Wdr.UI.Components.Base.Component

module Wdr.UI.Components
  @DungeonSelect = Component.extend
    template: '''
    <ul>
      <li v-repeat='dungeons'>
        <a href='/dungeons/{{href}}'>
          {{name}}
        </a>
      </li>
    </ul>
    '''

    data:
      dungeons: [
        {
          name: '試練の森'
          href: 'tutorial'
        }
      ]