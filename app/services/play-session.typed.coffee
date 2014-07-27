# module Wdr.Services
#   class @PlaySession
#     gold :: Int
#     name :: String
#     saveId :: String
#     players :: Wdr.Entities.Actor[]

#     save: -> new Promise (done) =>
#       Wdr.Storages.SaveObject.findOne(id: @saveId).then (saveObject) =>
#         saveObject.save({
#           gold: @gold
#         }).then done
