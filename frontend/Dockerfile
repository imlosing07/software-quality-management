FROM node:18-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:1.25-alpine

COPY --from=builder /app/build /usr/share/nginx/html

# Crea config para React Router
RUN echo 'server { \n\
    listen 80; \n\
    location / { \n\
        root /usr/share/nginx/html; \n\
        index index.html; \n\
        try_files $uri /index.html; \n\
    } \n\
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]