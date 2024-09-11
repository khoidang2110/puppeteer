# Stage 1: Build the application
FROM node:18-buster

# Cài đặt Google Chrome và các phụ thuộc cần thiết
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# Cài đặt Puppeteer
RUN npm install puppeteer@13.5.0

# Tạo người dùng không cần --no-sandbox
RUN addgroup --system pptruser && adduser --system --ingroup pptruser pptruser \
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
