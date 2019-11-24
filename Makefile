SERVICE = api
deploy:
	@echo Deploy service: $(SERVICE)
	@sed -e 's/SERVICE/$(SERVICE)/g' now.service.json > now.$(SERVICE).json
#	@cat now.$(SERVICE).json
	@now -A now.$(SERVICE).json
	@rm now.$(SERVICE).json
.PHONY: deploy

start:
	docker-compose up
.PHONY: start
