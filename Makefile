#### Environment Variables ####
# Allow override of env file path
ENV_FILE ?= .env

# Load environment variables at the start
ifneq (,$(wildcard $(ENV_FILE)))
    include $(ENV_FILE)
    export $(shell sed 's/=.*//' $(ENV_FILE))
endif

# Add a required vars check
.PHONY: check.env
check.env:
	@if [ -z "$(ARTIFACT_REGISTRY_HOST)" ]; then \
		echo "Error: ARTIFACT_REGISTRY_HOST not set in $(ENV_FILE)"; \
		exit 1; \
	fi
	@if [ -z "$(DOCKER_IMAGE)" ]; then \
		echo "Error: DOCKER_IMAGE not set in $(ENV_FILE)"; \
		exit 1; \
	fi
	
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

.PHONY: lint
lint:
	npm run lint
	npm run typecheck

.PHONY: format
format:
	npx prettier --write $(FORMAT_DIRS)

#### Build/Publish ####
# --- Version Tags
PACKAGE_NAME=waypoint
PACKAGE_VERSION=$(shell node -p "require('./package.json').version")
GIT_BRANCH=$(shell git rev-parse --abbrev-ref HEAD | tr -d '\n')
GIT_SHA=`git rev-parse --short HEAD`

ifeq ($(GIT_BRANCH),main)
    TAGNAME=v$(PACKAGE_VERSION)
    DOCKER_TAG=$(TAGNAME)
else
    TAGNAME=v$(PACKAGE_VERSION)-$(GIT_BRANCH)-$(GIT_SHA)
    DOCKER_TAG=$(TAGNAME)
endif

# --- General publish to github
.PHONY: publish.info
publish.info: 
	@echo "Package: $(PACKAGE_NAME)"
	@echo "Package Version: $(PACKAGE_VERSION)"
	@echo "Tagname: $(TAGNAME)"
	@echo "Docker tag: $(TAGNAME)"
	@echo "Docker image: $(DOCKER_IMAGE)"

.PHONY: publish.build
build:
	@echo "Building frontend..."
	npm run build

.PHONY: publish.tag
publish.tag:
	@if [ "$(GIT_BRANCH)" != "main" ]; then \
		echo "Error: Tagging a package release only allowed on main branch"; \
		exit 1; \
	fi
	@if git rev-parse "$(TAGNAME)" >/dev/null 2>&1; then \
		echo "Tag $(TAGNAME) already exists"; \
		exit 0; \
	fi
	@echo "---Tagging commit hash $(TAGNAME)"
	git tag -a $(TAGNAME) -m "Release $(TAGNAME)"
	git push origin $(TAGNAME)
	@echo "---Pushed tag as version=$(PACKAGE_VERSION)"

#### Docker Commands ####
.PHONY: docker.help
docker.help:
	@echo "Docker commands:"
	@echo "  make docker.build      - Build Docker image and tag based on branch"
	@echo "  make docker.push       - Push to Google Artifact Repository"

# ---- General ----
.PHONY: docker.build
docker.build: check.env
	@echo "Building image: $(DOCKER_IMAGE):$(DOCKER_TAG)"
	docker build -t $(DOCKER_IMAGE):$(DOCKER_TAG) .

.PHONY: docker.push
docker.push: check.env docker.build
	@echo "Pushing image to registry..."
	#Tag for registry
	docker tag $(DOCKER_IMAGE):$(DOCKER_TAG) $(ARTIFACT_REGISTRY_HOST)/$(DOCKER_IMAGE):$(DOCKER_TAG)
	docker push $(ARTIFACT_REGISTRY_HOST)/$(DOCKER_IMAGE):$(DOCKER_TAG)

	@if [ "$(GIT_BRANCH)" = "main" ]; then \
		echo "Tagging and pushing latest for main branch..."; \
		docker tag $(DOCKER_IMAGE):$(DOCKER_TAG) $(ARTIFACT_REGISTRY_HOST)/$(DOCKER_IMAGE):latest; \
		docker push $(ARTIFACT_REGISTRY_HOST)/$(DOCKER_IMAGE):latest; \
	fi

# ---- Development ----
.PHONY: dev.release
dev.release: publish.info 
	@if [ "$(GIT_BRANCH)" = "main" ]; then \
		echo "Warning: Running dev.release on main branch"; \
		exit 1; \
	fi
	@echo "Development release with tag: $(DOCKER_TAG)"
	@make docker.push
	@echo "Development release complete ✓"


.PHONY: dev.shell
dev.shell: publish.info 
	@echo "Opening dev container with shell..."
	@make docker.build
	docker run --rm -it --name $(DOCKER_IMAGE)-dev $(DOCKER_IMAGE):$(DOCKER_TAG) bash

.PHONY: dev.run
dev.run: publish.info 
	@echo "Running dev container..."
	@make docker.build
	docker run --rm -it -p 127.0.0.1:3000:3000 \
	--name $(DOCKER_IMAGE)-dev --env-file ./.env \
	$(DOCKER_IMAGE):$(DOCKER_TAG)

.PHONY: dev.clean
dev.clean: publish.info
	@echo "Cleaning up dev container..."
	@docker stop $(DOCKER_IMAGE)-dev 2>/dev/null || true
	@docker rm $(DOCKER_IMAGE)-dev 2>/dev/null || true
	@echo "Cleanup complete ✓"

# ---- Production ----
.PHONY: prod.release
prod.release: publish.info
	@if [ "$(GIT_BRANCH)" != "main" ]; then \
		echo "Error: Production release only allowed on main branch"; \
		exit 1; \
	fi
	@echo "Tagging production commit for github..."
	@make publish.tag
	@echo "Tagging production image for registry..."
	@make docker.push
	@echo "Production release complete with tag: $(DOCKER_TAG) ✓"

#### Development ####
.PHONY: node.dev
node.dev:
	npm start  # Uses CRA's development server

.PHONY: node.mock
node.mock:
	REACT_APP_USE_MOCK_AUTH=true npm start

.PHONY: node.clean
node.clean:
	rm -f public/mockServiceWorker.js
	rm -rf coverage/
	
.PHONY: node.init
node.init:
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
	--exclude-dir context src public node_modules \
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
