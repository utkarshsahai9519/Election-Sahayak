# Use node:18-alpine as the base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the React frontend
RUN npm run build

# Expose the port (Render/Cloud Run default to 8080)
EXPOSE 8080

# Start the Node.js backend server
CMD ["npm", "start"]
