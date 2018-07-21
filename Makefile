MODULES = ./node_modules/.bin
BABEL = $(MODULES)/babel
ESLINT = $(MODULES)/eslint
MOCHA = $(MODULES)/mocha

SRC_BASE = src/
SCRIPT_DEST = ./
SCRIPT_SRC = $(SRC_BASE)

help:
	@grep -E '^[a-zA-Z\._-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

lint: ## lints source 🎩
	$(ESLINT) $(SCRIPT_SRC)

compile-script: ## compiles scripts 🛠
	$(BABEL) $(SCRIPT_SRC) -d $(SCRIPT_DEST)

watch: compile-script ## watch for script changes and compile 🔍
	$(BABEL) $(SCRIPT_SRC) --watch -d $(SCRIPT_DEST)

setup: ## set up project for development 🏠
	npm install

build: ## build sources 🔨
	make compile-script

develop: build ## run development task 👷
	make watch

test: build ## test internal functions 👨‍⚕
	make lint && $(MOCHA)

cleanup: ## tidy out any generated/deployed files 👨‍🔧
	rm -rf lib test