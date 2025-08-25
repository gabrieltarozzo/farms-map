FROM webdevops/php-nginx:8.2
WORKDIR /app
ENV COMPOSER_ALLOW_SUPERUSER=1
ENV WEB_DOCUMENT_ROOT=/app/public

# 1) cache composer sem scripts (antes de copiar o código)
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-interaction --prefer-dist --no-scripts

# 2) copia o projeto e instala com scripts
COPY . /app
RUN composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader

# 3) SQLite para demo
RUN mkdir -p /app/database && touch /app/database/database.sqlite

# 4) permissões
RUN chown -R application:application storage bootstrap/cache database \
 && chmod -R 775 storage bootstrap/cache database

EXPOSE 80

# 5) start (SEM key:generate)
CMD bash -lc "\
  php artisan migrate --force || true && \
  php artisan db:seed --force || true && \
  php artisan storage:link || true && \
  php artisan config:cache || true && \
  php artisan route:cache || true && \
  /usr/bin/supervisord -n"
