Wdr.createRoutes = (router) ->
  router.match '', 'Entry#index'
  router.match 'camp', 'Camp#index'
