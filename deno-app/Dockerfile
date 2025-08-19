FROM denoland/deno:debian-2.4.4
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
COPY ./deno-app ./deno-app
COPY ./common ./common
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
COPY ./tsconfig.json ./tsconfig.json

RUN npm ci

WORKDIR /app/deno-app
RUN npm run build

EXPOSE 3002
CMD ["deno", "--allow-net", "--allow-read", "--unstable-detect-cjs", "--allow-env", "--no-npm", "dist/server.js"]