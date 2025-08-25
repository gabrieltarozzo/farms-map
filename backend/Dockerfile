# Dockerfile (Laravel + Nginx + SQLite)
FROM webdevops/php-nginx:8.2
WORKDIR /app

# cache melhor do composer
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-interaction --optimize-autoloader

# copia o resto do código
COPY . /app

# ajustes Laravel
RUN php artisan storage:link \
 && php artisan config:cache \
 && php artisan route:cache

# raiz pública
ENV WEB_DOCUMENT_ROOT=/app/public

# SQLite (teste)
RUN mkdir -p /app/database && touch /app/database/database.sqlite

EXPOSE 80

# migra + seed e sobe o nginx/php-fpm
CMD bash -lc "php artisan migrate --force || true; php artisan db:seed --force || true; /usr/bin/supervisord -n"
