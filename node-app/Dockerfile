FROM node:22.18.0-alpine
WORKDIR /app
COPY ./node-app ./node-app
COPY ./common ./common
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
COPY ./tsconfig.json ./tsconfig.json

RUN apk add curl
RUN npm ci

WORKDIR /app/node-app
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]