#!/usr/bin/env zsh
tcoffee -c \
  app/utils.coffee \
  app/ui/components/**/*.coffee \
  app/controllers/**/*.coffee \
  app/routes.coffee \
  app/initialize.typed.coffee \
  -o public/ -j app.js || true
