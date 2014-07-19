Wdr.createRoutes = (router) ->
  router.match '', 'Entry#index'
  router.match 'camp', 'Camp#index'
  router.match 'dungeon-select', 'DungeonSelect#index'
  router.match 'dungeons/:name', 'Dungeon#index'
  router.match 'battle', 'Battle#index'
  router.match 'battle-result', 'BattleResult#index'
