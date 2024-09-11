# Sử dụng Node.js base image với Ubuntu
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

# Set working directory
WORKDIR /app

# Sao chép các file của ứng dụng
COPY . .

# Cài đặt các phụ thuộc ứng dụng
RUN npm install --force

# Build ứng dụng
RUN npm run build

# Expose port ứng dụng chạy
EXPOSE 8888

# Lệnh khởi chạy ứng dụng
CMD ["npm", "start"]
