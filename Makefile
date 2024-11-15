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
.PHONY: dev.help
dev.help:
	@echo "Development commands:"
	@echo "  make dev          - Start development server"
	@echo "  make dev.mock     - Start development server with mock auth"
	@echo "  make dev.clean    - Clean development artifacts"
	@echo "  make dev.init     - Initialize mock service worker"

.PHONY: dev
dev:
	npm start  # Uses CRA's development server

.PHONY: dev.mock
dev.mock:
	REACT_APP_USE_MOCK_AUTH=true npm start

.PHONY: dev.clean
dev.clean:
	rm -f public/mockServiceWorker.js
	rm -rf coverage/
	
.PHONY: dev.init
dev.init:
	npx msw init public/


#### Context ####
.PHONY: context
context: context.clean context.src context.public context.settings

.PHONY: context.src
context.src:
	repo2txt -r ./src/ -o ./context/context-src.txt \
	&& python -c 'import sys; open("context/context-src.md","wb").write(open("context/context-src.txt","rb").read().replace(b"\0",b""))' \
	&& rm ./context/context-src.txt

.PHONY: context.settings
context.settings:
	repo2txt -r . -o ./context/context-settings.txt \
	--exclude-dir src public node_modules \
	--ignore-types .md \
	--ignore-files LICENSE package-lock.json README.md \
	&& python -c 'import sys; open("context/context-settings.md","wb").write(open("context/context-settings.txt","rb").read().replace(b"\0",b""))' \
	&& rm ./context/context-settings.txt

	
.PHONY: context.public
context.public:
	repo2txt -r ./public -o ./context/context-public.txt --ignore-types .png .ico .svg \
	--ignore-files favicon.ico \
	&& python -c 'import sys; open("context/context-public.md","wb").write(open("context/context-public.txt","rb").read().replace(b"\0",b""))' && \
	rm ./context/context-public.txt


.PHONY: context.clean
context.clean:
	rm ./context/context-*