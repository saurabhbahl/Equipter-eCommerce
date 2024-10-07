#!/bin/sh
echo "Installing packages........"
npm install

make_db() {  

    DB_NAME=${POSTGRES_DB}
 echo "Database Name: ${DB_NAME}" 

 DB_NAME=${DB_NAME}
 DB_USER=${DB_USER}
 DB_PASSWORD=${DB_PASSWORD}
 DB_HOST=${DB_HOST}
 DB_PORT=${DB_PORT}


# export PGPASSWORD="$DB_PASSWORD"


    echo "Creating database..."

    PGPASSWORD=${DB_PASSWORD} psql -U postgres -d postgres -c "CREATE DATABASE ${DB_NAME};"

    echo "Database created successfully."

    sleep 5
}

make_db

npm run db:generate
sleep 5

npm run db:migrate
sleep 5 

npm run db:seed
sleep 5


npm run start:dev