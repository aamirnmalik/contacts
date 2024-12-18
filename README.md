## Contacts App built for Knot
This is a simple contacts CRUD app built for Knot. It allows users to add, view, edit and delete contacts. 

## Running the app
To get started please clone the .env.example to .env and fill in the required environment variables.
The app has support for docker so a local PHP installation isn't required.
Simply run `docker-compose up` to start the app.

Once the containers are up you can access the app at localhost

## Front end Stack
- React
- React Query
- Tailwind UI
- Formik

The front end is built with React and uses React Query for data fetching and updating. 
Tailwind UI is used for styling the app.

## Back end Stack
The backend is built in laravel and uses a mysql database.
The Dockerfile is referencing a customized startup script which will run migrations and also start laravel reverb for websocket connections.

## Dashboard
The dashboard can be accessed on the `/dashboard` route. It is a simple dashboard that allows CRUD operations on contacts.

## API Auth
The dashboard SPA accesses the API using sessions which are established by logging into the app.
The app also supports API tokens to access the API. To issue a new access token, you can run a custom created command `php artisan app:generate-user-api-token {user}` in the container.
The command will generate a new token for the user and display it on the console.

Contact Policy is used to ensure only appropriate users can update the contact resources

## Realtime Updates
The app uses laravel reverb for running the websocket server. 
In order to see realtime updates please use the command `php artisan app:update-contact {contact} {first-name}` to update the first name of a contact. The command will update the contact and broadcast the update to the dashboard.

## Things ignored in the interest of time
- Currently, the history object is returned as a json object in the contact object. 
- The history object is displayed as json on the table listing
- There is no phone number validation or other validations except for email validation but its really simple to implement in the Request