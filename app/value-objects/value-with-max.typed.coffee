# module Wdr.ValueObjects
#   class @ValueWithMax
#     current :: Int
#     max :: Int
#     constructor: (@current, @max) ->
#       @max ?= @current
