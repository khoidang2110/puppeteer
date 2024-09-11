# Stage 1: Build the application
FROM node:18-alpine

# Install Chromium browser
RUN apk update && apk add --no-cache chromium

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
