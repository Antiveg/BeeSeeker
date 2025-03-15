# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire backend directory
COPY . .

# Set environment variables
ENV NODE_ENV=production

# Expose the backend port
EXPOSE 5000

# Run the application
CMD ["npm", "start"]
