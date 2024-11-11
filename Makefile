#### Node Environment ####
.PHONY: install
install:
	npm install

.PHONY: uninstall
uninstall:
	rm -rf node_modules
	rm package-lock.json

#### Testing ####
TEST_COMMANDS = \
	--coverage \
	--watchAll=false \
	--coverageDirectory=coverage \
	--coverageReporters="html" "text"

.PHONY: test
test: test.clean test.unit
	rm -rf coverage/

.PHONY: test.clean
test.clean:
	rm -rf coverage/

.PHONY: test.unit
test.unit:
	CI=true npm test -- $(TEST_COMMANDS)

#### Code Style ####
FORMAT_DIRS = src/
LINT_DIRS = src/

.PHONY: pre-commit
pre-commit: format lint test

.PHONY: lint
lint:
	npm run lint
	npm run typecheck

.PHONY: format
format:
	npx prettier --write $(FORMAT_DIRS)

#### Build ####
VERSION=$(shell node -p "require('./package.json').version")
TAGNAME=v$(VERSION)

.PHONY: build
build:
	npm run build

.PHONY: publish.tag
publish.tag:
	@echo "---Tagging commit hash $(TAGNAME)"
	git tag -a $(TAGNAME) -m "Release $(TAGNAME)"
	git push origin $(TAGNAME)
	@echo "---Pushed tag as version=$(VERSION)"

#### Development ####
.PHONY: dev
dev:
	npm start  # Uses CRA's development server