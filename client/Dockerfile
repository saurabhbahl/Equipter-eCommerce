# frontend

FROM node:18


WORKDIR /app

COPY package*.json /app/

RUN ["npm","install"]


COPY . /app


EXPOSE 5173


ENTRYPOINT ["npm", "run", "dev"]