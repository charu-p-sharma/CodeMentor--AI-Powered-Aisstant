# Use official Node.js base image
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install -f

# Copy all files (including tsconfig, src, etc.)
COPY . .

# Build TypeScript to JavaScript
RUN npm run build

# Expose the port (change if your backend uses a different port)
EXPOSE 5000

# Start the backend
CMD ["npm", "start"]
