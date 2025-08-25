# backend/Dockerfile
FROM webdevops/php-nginx:8.2
WORKDIR /app
ENV COMPOSER_ALLOW_SUPERUSER=1
ENV WEB_DOCUMENT_ROOT=/app/public

# 1) cache de dependências
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-interaction --prefer-dist --no-scripts

# 2) copia o projeto
COPY . /app

# 3) instala novamente (agora com código) e otimiza autoloader
RUN composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader

# 4) SQLite para demo
RUN mkdir -p /app/database && touch /app/database/database.sqlite

EXPOSE 80

# 5) prepara e sobe (agora com ENVs do Render)
CMD bash -lc "\
  php artisan key:generate --force || true && \
  php artisan migrate --force || true && \
  php artisan db:seed --force || true && \
  php artisan storage:link || true && \
  php artisan config:cache || true && \
  php artisan route:cache || true && \
  /usr/bin/supervisord -n"
