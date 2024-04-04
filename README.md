# Book Management REST API

## Description

This project implements a REST API for managing a list of books, where access to endpoints is restricted using access tokens issued for 2 hours.

## Technologies

- TypeScript
- Node.js
- Express
- Prisma ORM

## Requirements

### Get Access Token (Unauthenticated Request)

- **GET /auth/token:** Request to obtain an access token valid for 2 hours.

### API Endpoints for Books

- **GET /books:** Retrieve a list of all books.
- **POST /books:** Create a new book (requires access token).
- **PUT /books/:id:** Update book information by ID (requires access token).
- **DELETE /books/:id:** Delete a book by ID (requires access token).

## Authentication and Authorization

- Use JWT for generating and verifying access tokens.
- Check the access token in the Authorization header for protected endpoints.

## Running the Project

To start the project, run the following command:

```bash
npm run dev