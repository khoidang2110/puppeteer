FROM node:18

# We don't need the standalone Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# Install Google Chrome Stable and fonts
# Note: this installs the necessary libs to make the browser work with Puppeteer.
RUN apt-get update && apt-get install curl gnupg -y \
  && curl --location --silent https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update \
  && apt-get install google-chrome-stable -y --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

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
