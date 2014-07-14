module Wdr.Utils
  @template = (str, obj = {}) -> jade.compile(str)(obj)

window._t = Wdr.Utils.template
window._p = (fullfill, fail) -> new Promise fullfill, fail