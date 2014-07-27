# module Wdr.Entities.Base
#   Id = class @Id
#     value :: String
#     constructor: ->
#       @value = _.uniqueId()

#     # equal :: Id -> Boolean
#     # BUG: stack over flow
#     equal: (other :: {value :: String}) :: Boolean ->
#       @value is other.value

#   class @Entity
#     id :: Id
#     constructor: ->
#       @id = new Id

#     equal: (other) ->
#       @id.equal(other.id)
