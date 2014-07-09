Component = Wdr.UI.Components.Base.Component

module Wdr.UI.Components.Layout
  @Layout = Component.extend
    template: '''
    <header>
      <a href='/'>Home</a>
      <a href='/camp'>Camp</a>
    </header>
    <div id='scene-root'></div>
    '''