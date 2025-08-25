FROM webdevops/php-nginx:8.2
WORKDIR /app
ENV COMPOSER_ALLOW_SUPERUSER=1
ENV WEB_DOCUMENT_ROOT=/app/public

COPY composer.json composer.lock ./
RUN composer install --no-dev --no-interaction --prefer-dist --no-scripts

COPY . /app
RUN composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader

# sqlite p/ demo
RUN mkdir -p /app/database && touch /app/database/database.sqlite

# perms
RUN chown -R application:application storage bootstrap/cache database \
 && chmod -R 775 storage bootstrap/cache database

# entrypoint
COPY docker/entrypoint.sh /usr/local/bin/app-entrypoint.sh
RUN chmod +x /usr/local/bin/app-entrypoint.sh

EXPOSE 80
CMD ["/usr/local/bin/app-entrypoint.sh"]
