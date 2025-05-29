# Calculator API

A simple calculator API built with Laravel that performs basic arithmetic operations and stores calculation history.

## Requirements

- PHP 8.1+
- Laravel 10.x
- MySQL/SQLite
- Composer

## Setup

1. Clone the repository
2. Install dependencies:
```bash
composer install
```

3. Copy `.env.example` to `.env` and configure your database:
```bash
cp .env.example .env
```

4. Generate application key:
```bash
php artisan key:generate
```

5. Run migrations:
```bash
php artisan migrate
```

6. Start the development server:
```bash
php artisan serve
```

## API Endpoints

### Calculator

#### POST /api/calculator
Performs a calculation and stores it in the database.

Request body:
```json
{
    "a": 10,
    "b": 5,
    "operation": "add" // can be "add", "subtract", "multiply", "divide"
}
```

Response (200):
```json
{
    "id": 1,
    "result": 15
}
```

#### GET /api/calculation/{id}
Retrieves a specific calculation by ID.

Response (200):
```json
{
    "id": 1,
    "a": 10,
    "b": 5,
    "operation": "add",
    "result": 15,
    "created_at": "2025-05-28T11:00:00Z",
    "updated_at": "2025-05-28T11:00:00Z"
}
```

### Authentication (Stub)

#### POST /api/auth/login
A stub authentication endpoint that returns a dummy token.

Request body:
```json
{
    "email": "user@example.com",
    "password": "password"
}
```

Response (200):
```json
{
    "token": "dummy_token_1234567890"
}
```

## Testing with Postman/cURL

### Calculator Endpoint

```bash
# Perform calculation
curl -X POST http://localhost:8000/api/calculator \
  -H "Content-Type: application/json" \
  -d '{"a": 10, "b": 5, "operation": "add"}'

# Get calculation by ID
curl http://localhost:8000/api/calculation/1

# Login (stub)
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password"}'
```
