.PHONY: build
build: ## Docker image.
	docker compose -f docker-compose.yml build

.PHONY: start
start: ## Start the container.
	docker compose -f docker-compose.yml up -d

.PHONY: stop
stop: ## Stop the docker container.
	docker compose -f docker-compose.yml down
