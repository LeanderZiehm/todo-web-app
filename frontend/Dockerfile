# ---------- Stage 1: Build ----------
FROM node:20-alpine AS build
WORKDIR /app

# Copy dependency manifests and install
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
ENV TSC_COMPILE_ON_ERROR=true
RUN npm run build

# ---------- Stage 2: Nginx ----------
FROM nginx:1.27-alpine
WORKDIR /usr/share/nginx/html

# Remove default nginx static files
RUN rm -rf ./*

# Copy built frontend from previous stage
COPY --from=build /app/dist ./

# Copy a minimal nginx config (optional override)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
