# web3/Dockerfile — Frontend (Vite React) for Cloud Run

# 1) Build stage
FROM node:18-alpine AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# Copy source and build
COPY . .
RUN npm run build

# 2) Production stage — serve with nginx
FROM nginx:stable-alpine

# Copy built static files
COPY --from=build /app/dist /usr/share/nginx/html

# Replace default nginx conf with our customized one
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Cloud Run expects the container to listen on $PORT, we'll use 8080
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
