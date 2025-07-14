FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    libzip-dev \
    unzip \
    zip \
    libonig-dev \
    libxml2-dev \
    gnupg \
    && docker-php-ext-install pdo pdo_mysql mbstring zip exif pcntl

# Install Node.js and Yarn
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
 && apt-get install -y nodejs \
 && npm install --global yarn

# Copy Composer from official image
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy app files
COPY . .

# Optional: copy .env if needed (uncomment if not ignored)
# COPY .env .env

# Install dependencies
RUN yarn install
RUN composer install

# Laravel caches
RUN php artisan config:cache
RUN php artisan route:cache
RUN php artisan view:cache

# Set permissions
RUN chown -R www-data:www-data /var/www \
 && chmod -R 775 storage bootstrap/cache

# Expose Laravel dev server port
EXPOSE 10000

# Run migrations at runtime (not build time) and start server
CMD php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=10000
