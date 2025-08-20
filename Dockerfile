# Use the official Node.js 20 image.
FROM node:20-slim

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install production dependencies.
RUN npm install --omit=dev

# Copy local code to the container image.
COPY . .

# The service listens on the port defined by the PORT environment variable.
# Cloud Run provides this variable, and it defaults to 8080.
ENV PORT 8080

# Expose the port that the application listens on.
EXPOSE 8080

# Run the web service on container startup.
CMD ["npm", "start"]