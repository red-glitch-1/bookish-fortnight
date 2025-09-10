# Bookish Fortnight

A Laravel-based blog application with user authentication, posts, and comments functionality.

## Features

- User authentication and registration
- Post creation and management
- Comment system
- Role-based access control
- Modern UI with Inertia.js and React
- Docker containerization

## Prerequisites

- Docker and Docker Compose
- Git

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bookish-fortnight
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

3. **Start the application**
   ```bash
   docker-compose up -d --build
   ```

4. **Generate application key**
   ```bash
   docker compose exec app php artisan key:generate
   ```

5. **Run database migrations**
   ```bash
   docker compose exec app php artisan migrate
   ```

6. **Seed the database**
   ```bash
   docker compose exec app php artisan db:seed
   ```

## Usage

1. **Access the application**
   - Navigate to [http://localhost:8000/posts](http://localhost:8000/posts)

2. **Login credentials**
   - **Admin**: `test@example.com` / `password`
   - **Register**: Create a new account through the registration form

3. **Start using the application**
   - Create and manage posts
   - Add comments to posts
   - Manage your profile

## Technology Stack

- **Backend**: Laravel 12
- **Frontend**: React with TypeScript
- **UI**: Inertia.js
- **Database**: MySQL
- **Containerization**: Docker

## Development

The application uses Docker for development. All necessary services (PHP, MySQL, Nginx) are configured in the `docker-compose.yml` file.