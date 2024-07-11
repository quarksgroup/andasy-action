FROM alpine

RUN apk add --no-cache curl

RUN curl -L https://andasy.io/install.sh | ANDASY_INSTALL=/usr/local sh

COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]