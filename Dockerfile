
# Stage 1: Build the application
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Define arguments
# Set environment variable
ENV PROJECT=nest-docker-vps-cicd
ENV PORT_PROGRAM=8888
# Install app dependencies
COPY . .
RUN npm install --force
RUN npm run build
# COPY .env .env
# Expose the port the app runs on
EXPOSE ${PORT_PROGRAM}
CMD ["npm", "start"]