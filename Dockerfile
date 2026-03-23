FROM debian:stable-slim

RUN apt-get update && apt-get install -y --no-install-recommends curl ca-certificates \
    && rm -rf /var/lib/apt/lists/*

RUN --mount=type=cache,target=/tmp \
    curl -sSL https://andasy.io/install.sh | sh

RUN mv ~/.andasy/bin/andasy /bin/

COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
