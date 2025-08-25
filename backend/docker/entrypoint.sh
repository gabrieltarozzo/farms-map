#!/usr/bin/env bash
set -e

# perms
chown -R application:application storage bootstrap/cache database || true
chmod -R 775 storage bootstrap/cache database || true

# sqlite (se usar)
if [ "$DB_CONNECTION" = "sqlite" ] && [ -n "$DB_DATABASE" ] && [ ! -f "$DB_DATABASE" ]; then
  mkdir -p "$(dirname "$DB_DATABASE")"
  touch "$DB_DATABASE"
  chown application:application "$DB_DATABASE" || true
  chmod 664 "$DB_DATABASE" || true
fi

# artisan (ignora falhas se rodar em frio)
php artisan migrate --force || true
php artisan db:seed --force || true
php artisan storage:link || true
php artisan config:cache || true
php artisan route:cache || true

# inicia os serviços da imagem (nginx + php-fpm)
exec /entrypoint supervisord