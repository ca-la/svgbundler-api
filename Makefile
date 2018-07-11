SHELL := /bin/bash
.DEFAULT_GOAL := serve-dev

npm_bin = ./node_modules/.bin

.PHONY: lint
lint:
	$(npm_bin)/tslint 'src/**/*.ts'

.PHONY: test
test:
	env $$(cat .env | xargs) $(npm_bin)/ts-node $(npm_bin)/tape test.ts

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
dev: serve-dev

.PHONY: serve-dev
serve-dev:
	env $$(cat .env | xargs) $(MAKE) build run

.PHONY: prod
prod:
	NODE_ENV=production $(MAKE) build run
