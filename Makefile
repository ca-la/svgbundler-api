SHELL := /bin/bash

npm_bin = ./node_modules/.bin

.PHONY: lint
lint:
	$(npm_bin)/tslint 'src/**/*.ts'

.PHONY: clean
clean:
	-rm -r dist

.PHONY: build
build: clean
	$(npm_bin)/tsc

.PHONY: run
run:
	node dist

.PHONY: release
release:
	$(npm_bin)/cala-release $(type)

.PHONY: dev
dev:
	env $$(cat .env | xargs) $(MAKE) build run

.PHONY: prod
prod:
	NODE_ENV=production $(MAKE) build run
