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

build-and-run: build run
