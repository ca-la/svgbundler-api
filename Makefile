SHELL := /bin/bash

.PHONY: lint
lint:
	$$(npm bin)/tslint 'src/**/*.ts'

.PHONY: build
build:
	$$(npm bin)/tsc

.PHONY: run
run:
	node dist

.PHONY: dev
dev:
	env $$(cat .env | xargs) $(MAKE) build run

.PHONY: prod
prod:
	NODE_ENV=production $(MAKE) build run
