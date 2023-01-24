# TrackMyApplications
## This project helps you to track you're job application process by adding jobs applied    
### Features    
#### - Save,search,delete applications    
#### - Automatically shows you your callback/interview/offer/rejection rate over a period of time (that you can change dynamically)    
#### - Add notes to the application        
### Stack     
#### - ReactJS    
#### - DjangoREST API    
#### - TailwindCSS (responsive)    
### Setup (Docker)
#### Git clone    
#### Create a .env file inside the backend directory and add the following parameters:    
* EMAIL_HOST = ' ' e.g. smpt.gmail.com    
* EMAIL_PORT = ' ' e.g. 587    
* EMAIL_HOST_USER = ' ' e.g. username@gmail.com    
* EMAIL_HOST_PASSWORd = 'email_host_password' for example google app passwords      
#### Build the image in the root directory and then run the container       
```
docker-compose build    
docker-compose up    
```
