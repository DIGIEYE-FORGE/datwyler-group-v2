FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN chown -R nginx:nginx /usr/share/nginx/html && chmod -R 755 /usr/share/nginx/html && \
        chown -R nginx:nginx /var/cache/nginx && \
        chown -R nginx:nginx /var/log/nginx && \
        chown -R nginx:nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && \
        chown -R nginx:nginx /var/run/nginx.pid

COPY nginx-custom.conf /etc/nginx/conf.d/default.conf

COPY . .        

USER nginx

EXPOSE 80
