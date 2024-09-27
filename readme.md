# Equipter Backend E-Commerce

This is the backend of the Equipter E-Commerce.

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


6. **Ensure Your .env File is Properly Set Up in root and server folders:**
   If the environment variables for the database are not set correctly (e.g., missing POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB), the container might hang while trying to initialize.    Double-check your .env file to ensure it contains the correct values, like this:


       POSTGRES_USER=your_user
       POSTGRES_PASSWORD=your_password
       POSTGRES_DB=your_database
       DB_HOST=db
       DB_USER=your_user
       DB_PASSWORD=your_password
       DB_NAME=your_database
       DB_PORT=5432
       PORT=3000
       SF_ACCESS_TOKEN=Your Token 

7. **Before running the project make sure that Docker Desktop is running on your computer:**

   Run the docker desktop before running the project locally, navigate to the project folder  

8. **Navigate to the Project Folder and run the docker command:**

   After cloning the repo, navigate to the project folder and run docker commands in project terminal:

       docker-compose up


9. **Navigate to the client Folder and server folder in terminal and run the command:**

   After cloning the repo, navigate to the client and server folders and run the command terminal:

       npm i
    
    

