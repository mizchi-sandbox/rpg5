window._j = (str, obj = {}) -> jade.compile(str)(obj)
window._cc = (tpl, obj = {}) ->
  coffeecup.render tpl, obj
window._p = (fullfill, fail) -> new Promise fullfill, fail