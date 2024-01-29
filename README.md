# How to run the project?

## There are two ways to run this project:

### Installing manual

1. Install node:v20.10.0
2. In Backend-Centra-Window folder
   - Add environment variables in .env
     - SENDEREMAIL => add the email of sender
     - PASSWORD => Password (using APP PASSWORD of google) - [How to create app password by google](https://support.google.com/accounts/answer/185833?hl=en)
     - RECEIVEREMAIL => a person who receives the email
   - npm install
   - npm run server
3. In Centra-Window folder
   - npm install
   - npm run preview

### Installing using docker

1. Install Docker (v20.10.21) and Docker-compose (v2.13.0)
2. Add environment variables in docker-compose.yml file.
   - SENDEREMAIL => add the email of sender
   - PASSWORD => Password (using APP PASSWORD of google) - [How to create app password by google](https://support.google.com/accounts/answer/185833?hl=en)
   - RECEIVEREMAIL => a person who receives the email
3. Run command "docker-compose up" in terminal at root folder.
