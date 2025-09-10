# ---- PHP-FPM base
FROM php:8.4-fpm-alpine

# System & PHP Extensions
RUN apk add --no-cache \
    git curl zip unzip libpng libpng-dev icu-dev oniguruma-dev libzip-dev \
    bash shadow tzdata supervisor \
    && docker-php-ext-install pdo_mysql mbstring intl zip bcmath \
    && apk del libpng-dev

# Opcache (optional)
RUN docker-php-ext-enable opcache || true

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Workdir
WORKDIR /var/www/html

COPY . /var/www/html

# Node + NPM
RUN apk add --no-cache nodejs npm \
    && npm install -g npm@9.3.1

# UID/GID alignment (optional for Mac/Host)
RUN usermod -u 1000 www-data || true && groupmod -g 1000 www-data || true

# Install PHP dependencies
RUN composer install

# Permissions (Laravel storage/bootstrap)
RUN mkdir -p storage bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache

# Supervisor config
COPY ./docker/supervisord.conf /etc/supervisord.conf

USER www-data
