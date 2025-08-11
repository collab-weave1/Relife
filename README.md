# Relife

EPR compliance platform — Scalable Web Platform for E-Waste Management & Circular Economy

## Demo / Links

- **MVP-link**: [https://relife-ecycle.netlify.app/]

- **Live-link**: [https://relife-ecycle-live.netlify.app/]

- **Swagger / API docs**: [https://relife-y0xi.onrender.com/swagger-ui/index.html]

> **Note:** The backend instance may spin down with inactivity (render/Aiven), which can delay requests by ~50s or more.

## Table of Contents

    Overview

    Key Features

    Roles

    Tech Stack

    Architecture Overview

    Prerequisites

    Local Development

        Frontend (React + Vite)

        Backend (Spring Boot)

        Running with Docker (recommended)

    Environment Variables

    API Documentation

    Deployment

    Testing & Code Quality

    Troubleshooting

    Contributing

    License

    Contact

## Overview

ReLife is a web-first platform to help producers, recyclers, and consumers meet Extended Producer Responsibility (EPR) goals by enabling geo-enabled pickups, gamified incentives, a circular marketplace for refurbished devices, and verifiable proof-of-progress using blockchain.

## Key Features
- Geo-enabled pickup scheduling + route optimization
- Gamified incentives (Eco-Points) and blockchain-backed badges (proof-of-progress)
- Circular marketplace for certified refurbished electronics
- AI agent assistant (in-browser capabilities)
- In-browser image classification (ml5 / TensorFlow) and OCR (tesseract.js)
- EPR & impact dashboards (real-time analytics)
- Accessibility: WCAG 2.2 aligned features
- Sonarcloud for realtime comprehensive scanning of code to identify vulnerabilities, bugs and code smells

## Roles
- **User** — request pickups, earn badges and Eco-Points, buy refurbished items
- **Recycler** — manage collections, submit proofs, view leads
- **Producer** — monitor EPR metrics, fund/reconcile collections, compliance reporting

## Tech Stack
### Frontend
- React, Vite
- ml5.js (in-browser AI) / @tensorflow/tfjs / mobilenet
- tesseract.js (OCR)
- howler.js (audio)
- Mapbox (map), recharts, framer-motion, three.js
- Botpress webchat, jspdf, tsparticles

### Backend
- Spring Boot
- MySQL (Aiven)
- Redis (cache)
- Spring Security
- Swagger (springdoc-openapi)
- Razorpay (payments)
- Dockerized services

### Other
- Blockchain tooling: circom, snarkjs (for proof primitives)
- SonarCloud (code scanning)
- CI/CD (recommended: GitHub Actions / Render / Aiven)

## Architecture Overview
- **Client (React)** — UI, in-browser AI, OCR, maps, webchat.
- **API Layer (Spring Boot)** — RESTful APIs, role-based endpoints.
- **Persistence** — MySQL primary store; optional hybrid with MongoDB for unstructured data (presentation notes).
- **Cache** — Redis for session / hot data.
- **Blockchain Layer** — record verifiable badge/progress proofs.
- **Payments** — Razorpay for Donations and transactions.
- **CI/CD & Quality** — SonarCloud scans via Maven plugin; container images for deployment.

## API Documentation
Interactive API docs are available at:
```
https://relife-y0xi.onrender.com/swagger-ui/index.html
```
(Adjust host if running locally.)

## Deployment
- **Server:** Render (recommended for quick deploys)
- **Client:** Netlify — used for live/demo builds
- **Database:** Aiven (managed MySQL)
- **Sonarcloud and GitHub Actions for CI/CD:** run tests, lint, build images

## Testing & Code Quality
- Frontend linting: eslint.
- SonarCloud integration via Maven plugin (configured in pom.xml) for vulnerability & code smell scanning. Ensure Sonar token is configured in CI.

## Troubleshooting
Slow / delayed responses — As backend is hosted on Render, it may spin down due to inactivity. First request may take up to ~50s. 
