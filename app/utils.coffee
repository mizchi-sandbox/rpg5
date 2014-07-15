module Wdr.Utils
  @template = (str, obj = {}) -> jade.compile(str)(obj)

window._j = Wdr.Utils.template
window._cc = (tpl, obj = {}) ->
  coffeecup.render tpl, obj
window._p = (fullfill, fail) -> new Promise fullfill, fail