# backend
FROM node:18-alpine


# WORKDIR /usr/src/app
WORKDIR /app


COPY package*.json /app


RUN ["npm","install","--production"]


COPY . /app


EXPOSE 3000



# CMD [ "node", "index.js" ]
# nodemon to run the app in development mode
# ENTRYPOINT ["npx", "nodemon", "index.js"]
ENTRYPOINT ["npm", "run", "start:dev"]