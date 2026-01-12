# Chai Shots – Mini CMS + Public Catalog API

## Overview

**Chai Shots** is a mini CMS and public catalog system for managing structured content in the hierarchy:

**Programs → Terms → Lessons**, with support for **scheduled publishing**.

This project demonstrates **production-grade backend engineering**, including database schema design, migrations, background workers, transactional safety, and a consumer-facing catalog API.

The entire system is **fully Dockerized** and reproducible from scratch.

---

## Architecture

Programs, terms, and lessons are managed via a CMS-style backend and exposed through a public catalog API.  
A background worker handles scheduled publishing.

Frontend (React – Catalog Viewer)
↓
Public Catalog API (Fastify)
↓
PostgreSQL (Prisma ORM)
↑
Scheduled Worker (Node.js)

---

## Tech Stack

- **Backend:** Node.js + Fastify  
- **Database:** PostgreSQL (Docker)  
- **ORM:** Prisma  
- **Worker:** Node.js background worker (runs every 60 seconds)  
- **Frontend:** React + Vite (catalog viewer)  
- **Infrastructure:** Docker & Docker Compose  

---

## Services

| Service | Description |
|------|------------|
| `db` | PostgreSQL database |
| `api` | CMS backend + Public Catalog API |
| `worker` | Scheduled lesson publishing worker |

---

## Local Setup

### Prerequisites

- Docker & Docker Compose  
- Node.js (required only for local development)

---

### Start All Services


docker compose up --build
This starts:

PostgreSQL

API server

Background worker

Database initialization

Database Migrations
Apply database migrations:


docker compose exec api npx prisma migrate deploy
Migrations are committed to the repository

Fully reproducible across environments

Seed Data
Seed the database with demo content:


docker compose exec api npx prisma db seed
Seed creates:
2 Programs

Multiple Terms

Multiple Lessons

One lesson scheduled with publish_at within the next minute

Multi-lesson hierarchy for catalog testing

Worker – Scheduled Publishing
Behavior
Runs every 60 seconds

Finds lessons where:

status = SCHEDULED

publish_at <= now()

Publishes lessons transactionally

Automatically publishes the parent program on first lesson publish

Guarantees
Idempotent (safe to rerun)

Concurrency-safe (supports multiple workers)

Designed for production reliability

Logs

docker compose logs worker
Public Catalog API
Endpoints
GET /health
Health check

Verifies database connectivity

GET /catalog/programs
Returns published programs only

Includes:

Terms

Published lessons only

GET /catalog/programs/:id
Returns a single published program

Includes published lessons only

Notes
Only published content is exposed

API is designed for consumer-facing applications

Structured and predictable JSON responses

Frontend (Catalog Viewer)
Built with React + Vite

Displays:

Programs

Terms

Published lessons

Acts as a public catalog UI

CMS editing is intentionally backend-only

Demo Flow (Recommended)
Start all services


docker compose up --build
Apply migrations

Seed the database

Watch worker logs


docker compose logs worker
Observe scheduled lesson auto-publishing

Fetch catalog APIs to verify published content

Authentication & CMS UI (Scope Clarification)
Authentication and role-based CMS UI are intentionally out of scope.

The focus of this assignment is on:

Backend correctness

Worker logic

Database design

Deployment readiness

This scope is explicitly documented per assignment guidelines.

Design Tradeoffs
To prioritize backend quality:

Asset management is simplified

Multi-language validation is simplified

Frontend is a catalog viewer, not a CMS editor

Primary focus areas:

Scheduling correctness

Transaction safety

Production-style backend structure

Deployment Notes
Fully Dockerized

Environment-driven configuration

Ready for deployment on:

Render

Fly.io

AWS EC2

Similar cloud platforms

Summary
✅ Database schema & migrations
✅ Scheduled worker (idempotent & concurrency-safe)
✅ Public catalog API
✅ Dockerized infrastructure
✅ Seed data & reproducible demo flow

This project demonstrates production-grade backend engineering, not just CRUD scaffolding.
