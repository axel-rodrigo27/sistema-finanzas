.PHONY: backend frontend
backend:
	docker compose up escape-room
frontend:
	docker compose up frontend
db:
	docker compose up db 

start:
	docker compose up -d
stop:
	docker compose down