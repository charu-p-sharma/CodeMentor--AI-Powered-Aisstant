# Step 1: Build Vite App
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install -f

COPY . .
RUN npm run build

# Step 2: Serve with NGINX
FROM nginx:stable-alpine

RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
