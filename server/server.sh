
#!/bin/sh

make_db() {
    sleep 20

  
    DB_NAME=${POSTGRES_DB}

 
    if PGPASSWORD=${POSTGRES_PASSWORD} psql -h postgress-database -U postgres -tc "SELECT 1 FROM pg_database WHERE datname = '${DB_NAME}'" | grep -q 1; then
        echo "Database  already exists."
    else
        echo "Creating database '${DB_NAME}'..."
        if ! PGPASSWORD=${POSTGRES_PASSWORD} psql -h postgress-database -U postgres -c "CREATE DATABASE ${DB_NAME};"; then
            echo "Failed to create database. Exiting."
        fi
    fi

    sleep 10
}

make_db

npm run db:generate
sleep 12

npm run db:migrate
sleep 15 

npm run db:seed
sleep 10


npm run start:dev
