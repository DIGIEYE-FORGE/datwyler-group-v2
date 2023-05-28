FROM traefik:v2.5
WORKDIR /etc/traefik

COPY  . .

RUN chmod 600 certs/acme.json

EXPOSE 443
EXPOSE 8080
EXPOSE 80
