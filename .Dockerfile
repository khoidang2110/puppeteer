# Stage 1: Build the application
FROM node:18-alpine

# Cài đặt Chromium và các phụ thuộc cần thiết
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    nodejs \
    yarn

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Cài đặt Puppeteer
RUN npm install puppeteer@13.5.0

# Tạo người dùng không cần --no-sandbox
RUN addgroup -S pptruser && adduser -S -G pptruser pptruser \
    && mkdir -p /home/pptruser/Downloads /app \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /app

# Set working directory
WORKDIR /app

# Sao chép package.json và package-lock.json trước để cài đặt các phụ thuộc
COPY package*.json ./

# Cài đặt phụ thuộc
RUN npm install --legacy-peer-deps

# Sao chép các file ứng dụng còn lại
COPY . .

# Build ứng dụng NestJS
RUN npm run build

# Expose port
EXPOSE 8888

# Command để chạy ứng dụng
CMD ["npm", "run", "start:prod"]
