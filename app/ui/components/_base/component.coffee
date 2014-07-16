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

      $waitAnyOnce: (events) ->
        cbs = {}
        for eventName, fn of events then do (eventName, fn) =>
          @$on eventName, cbs[eventName] = =>
            @$off(k, v) for k, v of cbs
            fn arguments...

      $j: (query) ->
        $(@$el).find(query)

      $velocity: (query, args...) ->
        @$j(query).velocity args...
