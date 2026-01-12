Chai Shots – Mini CMS + Public Catalog API
Overview

This project implements a mini CMS + public catalog system for managing Programs → Terms → Lessons with scheduled publishing.
It demonstrates production-style backend architecture, database design, migrations, background workers, and a consumer-facing catalog API.

The system is fully Dockerized and reproducible from scratch.

Architecture
Tech Stack

Backend: Node.js + Fastify

Database: PostgreSQL (Docker)

ORM: Prisma

Worker: Node.js background worker (runs every 60 seconds)

Frontend: React (Vite) – catalog viewer

Infrastructure: Docker Compose

Services
Service	Description
db	PostgreSQL database
api	CMS backend + Public Catalog API
worker	Scheduled lesson publisher
Local Setup
Prerequisites

Docker & Docker Compose

Node.js (for local development only)

Start all services
docker compose up --build


This starts:

PostgreSQL

API server

Worker

Database Migrations

Apply migrations to the database:

docker compose exec api npx prisma migrate deploy


Migrations are included in the repository and fully reproducible.

Seed Data

Seed the database with demo data:

docker compose exec api npx prisma db seed

Seed creates:

2 Programs

Multiple Terms

Multiple Lessons

One scheduled lesson with publish_at within the next minute

Multi-lesson hierarchy for catalog testing

Worker – Scheduled Publishing

Runs every 60 seconds

Finds lessons where:

status = SCHEDULED

publish_at <= now()

Publishes lessons transactionally

Automatically publishes the parent program on first lesson publish

Idempotent (safe to rerun)

Concurrency-safe (supports multiple workers)

Logs can be observed via:

docker compose logs worker

Public Catalog API
Endpoints
GET /health


Health check

Verifies DB connectivity

GET /catalog/programs


Returns published programs only

Includes terms + published lessons

GET /catalog/programs/:id


Returns a single published program

Includes published lessons only

Notes

Only published content is exposed

API designed for consumer apps

Structured JSON responses

Frontend (Catalog Viewer)

Built using React + Vite

Displays:

Programs

Terms

Published lessons

Serves as a public catalog UI

CMS editing is intentionally backend-only for this assignment

Demo Flow (Recommended)

Start the system:

docker compose up --build


Apply migrations

Seed the database

Watch worker logs

Observe scheduled lesson auto-publishing

Fetch catalog API to verify updated published data

Authentication & CMS UI (Scope Clarification)

Authentication and role-based CMS UI were intentionally scoped out

Focus of this assignment is:

Backend correctness

Worker logic

Database design

Deployment readiness

This is explicitly documented per flexibility note in the assignment.

Design Tradeoffs

Asset management and multi-language validation are simplified to focus on:

Scheduling correctness

Transaction safety

Production-style backend structure

Frontend is a catalog viewer, not a full CMS editor

Prioritized backend signal over UI completeness

Deployment Notes

Fully Dockerized

Environment-driven configuration

Ready for cloud deployment (Render/Fly.io/EC2/etc.)

Summary

✅ Database schema + migrations
✅ Scheduled worker (idempotent & safe)
✅ Public catalog API
✅ Dockerized infra
✅ Seed data + demo flow

This project demonstrates production-grade backend engineering rather than CRUD scaffolding.