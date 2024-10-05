# # backend
# FROM node:18-alpine


# # WORKDIR /usr/src/app
# WORKDIR /app


# COPY package*.json /app


# RUN ["npm","install","--production"]


# COPY . /app


# EXPOSE 3000



# # CMD [ "node", "index.js" ]
# # nodemon to run the app in development mode
# # ENTRYPOINT ["npx", "nodemon", "index.js"]
# ENTRYPOINT ["npm", "run", "start:dev"]


# backend
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

RUN apk add --no-cache postgresql-client
# Copy the rest of the application code
COPY . .

# Copy the start script into the image
COPY server.sh ./

# Make sure the script is executable
RUN chmod +x ./server.sh

# Expose the application port
EXPOSE 3000

# Use the script as the entry point
ENTRYPOINT ["./server.sh"]
