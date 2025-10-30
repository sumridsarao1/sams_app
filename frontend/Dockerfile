FROM node:20-alpine

# Set working directory
WORKDIR /app

#adding frontend folder
ADD . .

# Install dependencies
RUN npm install

# Expose port for frontend
EXPOSE 3000

# Start the frontend app
CMD ["node", "app.js"]
