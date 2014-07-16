module Wdr.Storages
  class @Actor extends Momic.Model
    key: 'actors'
    id :: String
    ownerId :: String
    name :: String
    lv :: Int

    job :: String
    status ::
      str :: Int
      int :: Int
      dex :: Int
