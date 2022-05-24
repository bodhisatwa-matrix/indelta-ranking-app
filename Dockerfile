FROM node:14-alpine as node

ARG PORT=3000

WORKDIR /app
COPY ./ /app/
RUN npm install
RUN npm run build -- --prod

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:alpine
EXPOSE ${PORT}
COPY --from=node /app/dist/ubo /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
