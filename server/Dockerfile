# backend
FROM node:18


# WORKDIR /usr/src/app
WORKDIR /app


COPY package*.json /app


RUN ["npm","install"]


COPY . /app


EXPOSE 3000



# CMD [ "node", "index.js" ]
# nodemon to run the app in development mode
# ENTRYPOINT ["npx", "nodemon", "index.js"]
ENTRYPOINT ["npm", "run", "start:dev"]