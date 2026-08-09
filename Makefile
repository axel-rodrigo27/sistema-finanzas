.PHONY: backend frontend
backend:
	docker compose up sistema-finanzas
frontend:
	docker compose up frontend
db:
	docker compose up db 

start:
	docker compose up -d
stop:
	docker compose down