# Stage 1: Set up Flutter development environment
FROM cirrusci/flutter:latest AS flutter_env

WORKDIR /app

# Copy the Flutter app source code
COPY . .

# Get Flutter dependencies
RUN flutter pub get

# Stage 2: Set up Node.js environment
FROM node:16 AS node_env

WORKDIR /app

# Copy the Node.js app source code
COPY server/package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the Node.js app source code
COPY server/ .

# Stage 3: Combine Flutter and Node.js environments
FROM node:16

# This approach is common in multi-stage builds to ensure that all necessary components and dependencies are available in the final image without carrying over unnecessary build tools and intermediate files from earlier stages.

WORKDIR /app

# Copy Flutter environment setup
COPY --from=flutter_env /app /app

# Copy Node.js environment setup
COPY --from=node_env /app /app/server

# Install serve to serve the Flutter web app
RUN npm install -g serve

# Set the command to start the Node.js server
CMD ["npm","run","dev"]

# Expose ports for the app
EXPOSE 8080 3000
