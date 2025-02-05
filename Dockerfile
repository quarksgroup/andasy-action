FROM debian:stable-slim

RUN apt-get update && apt-get install -y curl

RUN curl -sSL https://andasy.io/install.sh | sh

# Github action changes $HOME env of containers to something else. Move the binary so they can be accessible.
RUN mv ~/.andasy/bin/andasy /bin/

COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
