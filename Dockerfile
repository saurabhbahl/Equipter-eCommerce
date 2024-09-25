
FROM node:18


WORKDIR /usr/src/app


COPY package*.json ./


RUN npm install


COPY . .


EXPOSE 3000


# CMD ["npm", "run", "dev"]
# CMD [ "node", "index.js" ]
# nodemon to run the app in development mode
CMD ["npx", "nodemon", "index.js"]
