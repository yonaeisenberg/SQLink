# SQLink

Welcome to SQLink users application

1. Setting up the server

- You should run a SQL Server on localhost. Mine uses 'SA' as the user and password 'password'. 
Feel free to change the password to anything that suits you. If so, change accordingly in the connection string in the SQLinkDbContext.cs file

- Use the sql query in the .sql file at the root of the project to create the DB and the tables.

- Run the .net core server. It should automatically open a Swagger page to try the API. Be sure to register on which port it is running.
When the server goes up, it should automatically fill the database with some seed data

2. Setting up the client

- Run npm install inside the client folder
- In login.component.ts, where the axios post request is, make sure to change the port in the url to your relevant server port.
- Same for the Get request in projexts-table.component.ts
- Run the client with ng serve --open

3. Using the app
- You should arrive to the login page. Use one of the seed data credentials entered to the DB (you can find them in the server code in SeedData.cs)
- You should then be redirected to the contact info page displaying avatar, contact info, and the projects table.
