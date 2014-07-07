#!/usr/bin/env zsh
tcoffee -c \
  app/value-objects/**/*.coffee \
  app/entities/**/*.coffee \
  app/services/**/*.coffee \
  app/storages/**/*.coffee \
  app/ui/components/**/*.coffee \
  app/controllers/**/*.coffee \
  app/initialize.typed.coffee \
  -o public/ -j app.js || true
