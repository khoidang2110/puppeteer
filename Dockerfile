# Stage 1: Build the application
FROM node:18-alpine

# Install Chromium and necessary dependencies
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

# Copy all application files
COPY . .

# Install app dependencies
RUN npm install --force

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 8888

# Start the application
CMD ["npm", "start"]
