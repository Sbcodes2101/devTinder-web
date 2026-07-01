#DevTinder

-Created a vite + React application
-Remove unnecessary code and created a hello world app
-Installing tailwind
-Install Daisy Ui
-Add navbar component to App.jsx
-create a navbar.jsx
-Install react router dom
Create BrowserRouter > Routes > Route=/ Body > RouteChildren
-create a footer
-Create a Login Page
-Install axios
CORS - install cors in backend => add middleware to with configurations: origin, credentials: true
-Install Redux Toolkit - 
-install react-redux + @reduxjs/toolkit => configureStore => Provider => createSlice => add reducer to store
-configureStore => Provider => createSlice => add reducer to store
-Add redux devtools in chrome
Login and seeing whether the data is coming properly in the store
-navBar should update as soon as user logs in
-adding constants file + create a component folder
-we should not be able to access other routes without logining in
-Logout Feature
-Get the feed and add the feed in the store
-build the user card on feed
-Edit profile Feature
-Show Toast Message after updating profile
New Page - See all my connections
New Page - See all my connection Requests
Features - Accept/reject the connection Request
Send/ignore the user card from the feed
Signup new user

Body
    NavBar
    Route=/ => Feed
    Route=/login => Login
    Route=/connection => Connections

# Real time Chat using websocket(socket.io)
 -Build the UI for a chat window on /chat/:targetUserId
 -Setup socket.io in backend
 -npm i socket.io

<!-- Launching frontend in AWS (DEPLOYMENT) -->

-SignUp on AWS
-Launch instance in EC2 engine
-download secret key .pem(key to your server)
-icacls "C:\Users\sarth\Downloads\DevTinder-secret.pem" /inheritance:r
-"C:\Users\sarth\Downloads\DevTinder-secret.pem" /grant:r "$($env:USERNAME):R"
ssh -i "DevTinder-secret.pem" ubuntu@ec2-13-51-171-158.eu-north-1.compute.amazonaws.com
-installed node to server and same node version to my laptop
-cloned both backend and frontend of the application
-Frontend
    -npm install in server => dependencies
    -npm run build
    -Installing NGNIX
    -sudo apt install nginx -y
    -sudo systemctl status nginx
    -copy code from dist(build files) to /var/www/html
    -sudo cp -r dist/* /var/www/html/
    -Enable port 80
-Backend
    -updated DB password
    -allowed ec2 instance public IP on mongodb server
    -installed pm2 -g
    -sudo npm install -g pm2
    -pm2 start npm -- start
    -pm2 logs(to ckeck the logs)
    -pm2 list, pm2 flush <name>,pm2 stop<name>,pm2 delete <name>
    -pm2 start npm --name "devTinder-Backend" -- start
    now the npm name will be devTinder-Backend
    -config ngnix - /etc/ngnix/sites-available/default
    -restart ngnix
    -Modify the BASEURL in frontend project to /api

# Ngnix config

    Frontend = http://13.51.171.158/
    Backend = http://13.51.171.158:7777/

    Domain name = devTinder.com => 13.51.171.158

    Frontend = devTinder
    Backend = devTinder.com:7777 => devTinder.com/api

    location /api/ {
    proxy_pass http://localhost:7777/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";

    proxy_set_header Host $host;

    proxy_cache_bypass $http_upgrade;
     }

to reconnect to the server
ssh -i "C:\Users\sarth\Downloads\DevTinder-secret.pem" ubuntu@13.51.171.158






