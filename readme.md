# Equipter E-Commerce

## 🛠️ Installation Steps with Docker

1. **Install the Docker on your operating system (if not installed):**  
   Download and install Docker from the official website:  

      [Docker Download Link](https://www.docker.com/products/docker-desktop/)

2. **Verify Docker Installation:**  
      After installing, verify the installation by running the following command in the terminal:
  
            docker -v

3. **Install Git (if not installed):**
   Ensure Git is installed on your system. Download and install it from the official site:

     [Git Download Link](https://git-scm.com/download/win)


4. **Verify Git Installation:**
   After installing, verify Git installation by running:

            git -v

5. **Clone the Repository:**
   Clone the repository to your local computer by running the following command:

            git clone https://github.com/saurabhbahl/Equipter-Backend-E-Commerce.git


6. **Ensure Your .env File is Properly Set Up in server folder:**
   If the environment variables for the database are not set correctly (e.g., missing POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB), the container might hang while trying to initialize.    Double-check your .env file to ensure it contains the correct values, like this:


### Server's .env
        DB_HOST='db'
        DB_USER='postgres'
        DB_PASSWORD='admin'
        DB_NAME='equipter'
        DB_PORT=5432
        DB_URL='postgresql://postgres:admin@db:5432/equipter?schema=public'

        POSTGRES_USER='postgres'
        POSTGRES_PASSWORD='admin'
        POSTGRES_DB='db_name'

        PORT=3000

        JWT_SECRET="your_jwt_secret_here"

        FRONTEND_URL='http://localhost:5173'

        MAILER_EMAIL=your_email_here@gmail.com
        MAILER_PASSWORD=your_app_password_here


        SF_ACCESS_TOKEN_URL='https://login.salesforce.com/services/oauth2/token?grant_type=password&client_id=your_client_id&client_secret=your_client_secret&username=your_salesforce_username&password=your_salesforce_password'
        SF_INSTANCE_URL='your_salesforce_instance_url'
        SF_CLIENT_ID='your_salesforce_client_id'
        SF_CLIENT_SECRET='your_salesforce_client_secret'
        SF_USERNAME='your_salesforce_username'
        SF_PASSWORD='your_salesforce_password'
        SF_SECURITY_TOKEN='your_salesforce_security_token'
        SF_OBJECT_URL='https://your_salesforce_instance_url/services/data/v52.0/sobjects'



### Client's .env
        VITE_BACKEND_URL=http://localhost:3000

7. **Before running the project make sure that Docker Desktop is running on your computer:**

   Run the docker desktop before running the project locally, navigate to the project folder  

8. **Navigate to the Project Folder and run the docker command:**

   After cloning the repo, navigate to the project folder and run docker commands in project terminal:

            docker-compose up


9. **Navigate to the client Folder and server folder in terminal and run the command:**

   After cloning the repo, navigate to the client and server folders and run the command terminal:

            npm i
    
# 📦Packages and Libraries

   ### Server-side Dependencies (Backend)
   - **@faker-js/faker**: For generating fake data.
   - **bcryptjs**: Password hashing library.
   - **cors**: Middleware for enabling Cross-Origin Resource Sharing.
   - **dotenv**: For loading environment variables from .env files.
   - **drizzle-orm**: Database ORM for working with SQL databases.
   - **express**: Web framework for Node.js.
   - **jsonwebtoken**: For creating and verifying JSON Web Tokens.
   - **nodemailer**: For sending emails.
   - **nodemon**: Tool for restarting the server automatically when file changes occur.
   - **pg**: PostgreSQL client for Node.js.
   - **pg-hstore**: Library for serializing JSON objects to HStore format in PostgreSQL.
   - **postgres**: Node.js driver for PostgreSQL databases.
   - **zod**: TypeScript-first schema declaration and validation.
   
   ### Dev Dependencies (Backend)
   - **drizzle-kit**: CLI for generating and running migrations for Drizzle ORM.
   
   ### Client-side Dependencies (Frontend)
   - **@fortawesome/free-solid-svg-icons**: FontAwesome solid icon library.
   - **@fortawesome/react-fontawesome**: FontAwesome wrapper for React.
   - **axios**: HTTP client for making API requests.
   - **react**: JavaScript library for building user interfaces.
   - **react-dom**: Entry point for rendering React components to the DOM.
   - **react-router-dom**: Routing library for React.
   - **zod**: Schema validation for TypeScript.
   
   ### Dev Dependencies (Frontend)
   - **@vitejs/plugin-react**: Vite plugin to support React fast refresh and JSX.
   - **autoprefixer**: PostCSS plugin to parse CSS and add vendor prefixes.
   - **eslint**: Linting tool for JavaScript and TypeScript.
   - **eslint-plugin-react-hooks**: ESLint plugin for React hooks.
   - **eslint-plugin-react-refresh**: ESLint plugin to help ensure React fast refresh works correctly.
   - **globals**: Library of global variable names for JavaScript environments.
   - **postcss**: Tool for transforming CSS with plugins.
   - **tailwindcss**: Utility-first CSS framework.
   - **typescript**: Typed superset of JavaScript.
   - **typescript-eslint**: ESLint plugin for TypeScript.


