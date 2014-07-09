Vue.directive 'dispatcher',
  isLiteral: true
  bind: (value) ->
    @el.addEventListener 'click', =>
      @vm.$dispatch(@expression)

Vue::dispose = ->
  @$destroy()

module Wdr.UI.Components.Base
  @Component = Vue.extend
    methods:
      on: (eventName, callback) ->
        @$off(eventName)
        @$on(eventName, callback)

