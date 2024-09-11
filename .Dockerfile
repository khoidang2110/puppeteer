# Stage 1: Build the application
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application files
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the port the app runs on
EXPOSE 8888

# Command to run the application
CMD ["npm", "run", "start:prod"]
