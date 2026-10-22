FROM node:lts-alpine3.24 AS builder

WORKDIR /app
COPY . .

ARG VITE_HOST_ORIGIN
ENV VITE_HOST_ORIGIN=$VITE_HOST_ORIGIN

RUN npm ci
RUN npm run build

FROM nginx:1.31.6-alpine3.24


WORKDIR /dist
COPY --from=builder /app/dist/ .
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]