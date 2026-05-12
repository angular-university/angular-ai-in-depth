
## Backend code rules

- the backend uses Node and Express, and runs on localhost:9000.

- to start the backend the user should run npm run server

- there is no persistent database, just in-memory modifiable mock data based on a db-data.ts file

- each Express route should be in a separate file under the /server/routes folder. Make the routes plain express functions, and link them to the url and the HTTP method on server.ts

- make the backend secure according to the latest OWASP recommendations.

- load environment variables from an environment file .env using the dotenv package

- use the package pino for logging. Add appropriate logging to all code.

- don't use the OpenAI SDK Node wrapper to interact with their API. Instead, build plain HTTP requests directly.

- authentication is based on email and password only, hashed/salted passwords. 

- create an initial mock user on db-data.ts, like email test@angular-university.io with password Angular123  
