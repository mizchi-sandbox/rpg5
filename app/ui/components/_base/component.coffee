module Wdr.Component.Base
  @Component = Vue.extend
    methods: {}

Vue::dispose = ->
  @$destroy()
  console.info 'dispose'