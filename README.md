# HUXE 2020 Authenication Example

This project contains an auth module with the following features

* Adds auth guards to redirect the user depending on its authentication state
* Retrieves and stores the JWT token in the local storage
* Adds a HTTP interceptor to append any existing JWT token and listens to token timeouts
* Provides a login form
* Provides a logout
* Provides an auth-service that manages the user authentication 

The project contains a very basic application layout with nested child routes.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Starting the backend

1. Go to `https://strapi.io/documentation/developer-docs/latest/getting-started/quick-start.htm` and setup a Strapi backend.
2. Create a new user and give it the role `Authenticated`
3. Add the backend URL to the `environment*.ts` files.

To start your backend again, navigate into the strapi-backend directory on your machine and use this command: 

```npm run develop```
