# backend/Dockerfile
FROM webdevops/php-nginx:8.2
WORKDIR /app
ENV COMPOSER_ALLOW_SUPERUSER=1
ENV WEB_DOCUMENT_ROOT=/app/public

# 1) cache do composer
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-interaction --prefer-dist --no-scripts

# 2) copia o projeto
COPY . /app

# 3) instala com código presente
RUN composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader

# 4) SQLite p/ demo
RUN mkdir -p /app/database && touch /app/database/database.sqlite

# 5) permissões (usuário da imagem é "application")
RUN chown -R application:application storage bootstrap/cache database \
 && chmod -R 775 storage bootstrap/cache database

EXPOSE 80

# 6) prepara e sobe
CMD bash -lc "\
  php artisan key:generate --force || true && \
  php artisan migrate --force || true && \
  php artisan db:seed --force || true && \
  php artisan storage:link || true && \
  php artisan config:cache || true && \
  php artisan route:cache || true && \
  /usr/bin/supervisord -n"
