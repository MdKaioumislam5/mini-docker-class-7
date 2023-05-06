FROM node:20-alpine as backend
WORKDIR /app
COPY express-app/package.json express-app/yarn.lock ./
RUN yarn 
COPY express-app ./
CMD node index.js

FROM node:20-alpine as build-frontend
WORKDIR /app
COPY vite-project/package.json express-app/yarn.lock ./
RUN yarn 
COPY vite-project ./
RUN yarn build

FROM caddy:2.5.2-alpine as build-serve
WORKDIR /srv 
COPY --from=build-frontend /app/dist /srv/ 
COPY Caddyfile /etc/caddy/Caddyfile