# Use an official Node.js runtime as a parent image
FROM node:22-alpine

# Set the working directory in the container
WORKDIR /app

# Install dependencies
COPY package*.json .
COPY yarn.lock .
RUN npm install

# Bundle app source
COPY . .

# Build your Next.js app for production
RUN npm run build

# Start the application
CMD ["npm", "start"]