FROM oven/bun:1.2.20-debian
USER root
RUN apt-get update && apt-get install -y curl

# Use bash for the shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Create a script file sourced by both interactive and non-interactive bash shells
ENV BASH_ENV /home/${whoami}/.bash_env
RUN touch "${BASH_ENV}"
RUN echo '. "${BASH_ENV}"' >> ~/.bashrc

# Download and install nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | PROFILE="${BASH_ENV}" bash
RUN echo node > .nvmrc
RUN nvm install
RUN nvm install 22

WORKDIR /app
COPY ./bun-app ./bun-app
COPY ./common ./common
COPY ./package.json ./package.json
COPY ./bun.lock ./bun.lock
COPY ./tsconfig.json ./tsconfig.json

# RUN apt-get install curl
RUN bun install --network-concurrency=10


WORKDIR /app/bun-app
RUN bun run build

EXPOSE 3001
CMD ["bun", "start"]