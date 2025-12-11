# NovaLMS Backend

This is the backend for the NovaLMS project, built with Laravel (PHP).

## Features

-   RESTful API for courses, lessons, sections, enrollments, and users
-   Authentication and authorization (Sanctum)
-   Progress tracking and instructor controls
-   Database migrations, seeders, and factories

## Getting Started

### Prerequisites

-   PHP 8.1+
-   Composer
-   MySQL or PostgreSQL

### Installation

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

### Database

Configure your `.env` file with your database credentials, then run:

```bash
php artisan migrate --seed
```

### Development

```bash
php artisan serve
```

## Project Structure

-   `app/` — Application code (models, controllers, providers)
-   `routes/` — API, web, and console routes
-   `database/` — Migrations, seeders, factories
-   `resources/` — Views and assets

## License

[MIT](../LICENSE)
