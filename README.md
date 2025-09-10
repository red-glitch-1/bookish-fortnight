# Bookish Fortnight

A Laravel-based blog application with user authentication, posts, and comments functionality.

## Features

- User authentication and registration
- Post creation and management
- Comment system
- Role-based access control
- Modern UI with Inertia.js and React

## Prerequisites

- PHP 8.2 or higher
- Composer
- Node.js and npm
- Git

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bookish-fortnight
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install Node.js dependencies**
   ```bash
   npm install
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

5. **Configure your database**
   - Create a SQLite database file:
   ```bash
   touch database/database.sqlite
   ```
   - (Optional) Update your `.env` file to use SQLite:
   ```
   DB_CONNECTION=sqlite
   DB_DATABASE=database/database.sqlite
   ```

6. **Generate application key**
   ```bash
   php artisan key:generate
   ```

7. **Run database migrations**
   ```bash
   php artisan migrate
   ```

8. **Seed the database**
   ```bash
   php artisan db:seed
   ```

9. **Build frontend assets**
   ```bash
   npm run build
   ```

10. **Start the development server**
    ```bash
    php artisan serve
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

## Development

### Running the application
```bash
# Start the Laravel development server
php artisan serve

# In another terminal, watch for frontend changes
npm run dev
```

## Technology Stack

- **Backend**: Laravel 12
- **Frontend**: React with TypeScript
- **UI**: Inertia.js
- **Database**: SQLite
- **Build Tool**: Vite