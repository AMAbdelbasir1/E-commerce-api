# Full E‑Commerce API

Production-ready RESTful API for an e‑commerce platform built with Express.js and MongoDB. This repository implements products, categories, brands, users, authentication, carts, orders, coupons, reviews, image uploads, and more — designed for learning or as a backend for a storefront application.

## Key Features

- User authentication (JWT) and role-based access (admin/customer)
- CRUD for products, categories, sub-categories, and brands
- Product reviews and ratings
- Shopping cart and wishlist management
- Order creation and status management
- Coupon/discount support
- Image uploads (Multer + Sharp) and static serving
- Email sending (nodemailer) and password reset flows
- Request validation, error handling and security hardening (rate-limit, xss-clean, mongo-sanitize)
- Swagger API docs included

## Tech Stack

- Node.js + Express
- MongoDB (Mongoose)
- JWT for auth
- Multer + Sharp for image processing
- Stripe (payment integration placeholder)

## Prerequisites

- Node.js 18+ and npm
- MongoDB instance (local or cloud)

## Quick Start

1. Clone the repo

   git clone https://github.com/AMAbdelbasir1/E-commerce-api.git
   cd full-ecommerce

2. Install dependencies

   npm install

3. Create and configure environment file

   - Copy `config.env` (or create it) to the project root and set the required variables (PORT, DATABASE_URI, JWT_SECRET, SMTP settings, STRIPE_KEY, etc.).

4. Run the app (development)

   npm run dev

5. Production start

   npm start

## Environment Variables

Example variables to add to `config.env`:

- PORT=5000
- DATABASE_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/dbname
- JWT_SECRET=your_jwt_secret
- JWT_EXPIRES_IN=7d
- SMTP_HOST=
- SMTP_PORT=
- SMTP_USER=
- SMTP_PASS=
- STRIPE_SECRET_KEY=

## Project Structure (high level)

- `server.js` — application entry
- `config/` — configuration (database connection)
- `models/` — Mongoose models
- `routers/` — Express route definitions
- `services/` — business logic / service layer
- `middlewares/` — request validation, error handling, uploads
- `utils/` — helpers (email, token, api features)
- `uploads/` — uploaded images

## API Overview

Main resource routes (see `routers/` for full list):

- `POST /api/v1/auth/register` — register new user
- `POST /api/v1/auth/login` — user login
- `GET /api/v1/products` — list/search products
- `GET /api/v1/products/:id` — product details
- `POST /api/v1/categories` — create category (admin)
- `POST /api/v1/brands` — create brand (admin)
- `POST /api/v1/orders` — create order
- `POST /api/v1/cart` — manage cart
- `POST /api/v1/wishlist` — add to wishlist

Swagger UI is available if configured; consult `swagger.json` and `swagger-ui-express` usage in the code.

## Tests

There are no automated tests included. To add tests, install a test runner (Jest / Mocha) and add scripts to `package.json`.

## Contributing

- Fork the repo and create a feature branch
- Open a PR with a clear description and related issue
- Keep changes focused and include tests where applicable

## Maintenance & Notes

- Ensure `config.env` is populated before starting the server.
- The project uses `nodemon` for development (`npm run dev`).
- Check `package.json` for all scripts and dependencies.
