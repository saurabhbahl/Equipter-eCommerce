
#!/bin/sh
npm install

make_db() {
  

    DB_NAME=${POSTGRES_DB}

    # Check if the database already exists
    if PGPASSWORD=${POSTGRES_PASSWORD} psql -h postgres-database -U postgres -tc "SELECT 1 FROM pg_database WHERE datname = '${DB_NAME}'" | grep -q 1; then
        echo "Database created!."
    else
        echo "Creating database '${DB_NAME}'..."
      
        if ! PGPASSWORD=${POSTGRES_PASSWORD} psql -h postgres-database -U postgres -c "CREATE DATABASE ${DB_NAME};"; then
            echo "Failed to create database . Exiting."
        fi
    fi

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
