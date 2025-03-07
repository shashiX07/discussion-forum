# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Expose the ports
EXPOSE 3000
EXPOSE 3001

# Start both the React app and the JSON server
CMD ["sh", "-c", "npm run server & npm start"]