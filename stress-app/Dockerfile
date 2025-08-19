FROM node:22.18.0
WORKDIR /app
COPY . .

RUN npm ci

EXPOSE 8080
CMD ["npm", "start"]