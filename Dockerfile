
# Stage 1: Build the application
FROM node:18-alpine

RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

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