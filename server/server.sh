#!/bin/sh
echo "installing packages............"
npm install


makedb(){
 DB_NAME=${POSTGRES_DB}
 echo "Database Name: ${DB_NAME}" 

 DB_NAME=${DB_NAME}
 DB_USER=${DB_USER}
 DB_PASSWORD=${DB_PASSWORD}
 DB_HOST=${DB_HOST}
 DB_PORT=${DB_PORT}


export PGPASSWORD="$DB_PASSWORD"


    echo "Creating database..."
    psql -h postgres-database -U "$DB_USER" -d postgres -c "CREATE DATABASE ${DB_NAME} IF NOT EXISTS"
    echo "Database ${DB_NAME} created successfully."


}
makedb

echo "generating migration............."
npm run db:generate

echo "migrating database............."
npm run db:migrate

echo "seeding database............."
npm run db:seed

echo "running the server............."
npm run start:dev