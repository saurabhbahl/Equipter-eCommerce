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


       DB_HOST='db_host'
       DB_USER='user'
       DB_PASSWORD='password'
       DB_NAME='db'
       DB_PORT=5432
       PORT=3000
       DB_URL='postgresql://user:password@db_host:5432/db?schema=public'

       POSTGRES_USER='user'
       POSTGRES_PASSWORD='password'
       POSTGRES_DB='db'
       SF_ACCESS_TOKEN_URL='https://login.salesforce.com/services/oauth2/token?grant_type=password&client_id=3MVG9dummyclientid&client_secret=clientsecret&username=user@example.com&password=password'

       SF_INSTANCE_URL='https://-instance.salesforce.com'
       SF_CLIENT_ID='3MVG9clientid'
       SF_CLIENT_SECRET='clientsecret'
       SF_USERNAME='user@example.com'
       SF_PASSWORD='password'
       SF_SECURITY_TOKEN='securitytoken'
       SF_OBJECT_URL='https://-instance.salesforce.com/services/data/v52.0/sobjects'


      # Client's .env
       VITE_BACKEND_URL=http://localhost:3000

7. **Before running the project make sure that Docker Desktop is running on your computer:**

   Run the docker desktop before running the project locally, navigate to the project folder  

8. **Navigate to the Project Folder and run the docker command:**

   After cloning the repo, navigate to the project folder and run docker commands in project terminal:

       docker-compose up


9. **Navigate to the client Folder and server folder in terminal and run the command:**

   After cloning the repo, navigate to the client and server folders and run the command terminal:

       npm i
    
    

