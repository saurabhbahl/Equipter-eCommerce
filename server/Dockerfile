

# backend
FROM node:18


WORKDIR /app


COPY package*.json ./


RUN ["npm","install"]

RUN apt-get update && \
    apt-get install -y postgresql-client && \
    rm -rf /var/lib/apt/lists/*



COPY . /app


COPY server.sh  /app/server.sh



RUN chmod +x server.sh


EXPOSE 3000


ENTRYPOINT ["sh","server.sh"]
