
# About this repo

This is an educational sample application for the Angular AI In Depth course, by the Angular University.

Make sure that all code uses the appropriate Angular best practices and examples as according to the Angular CLI MCP server.

The application is a simple chatbot based on the OpenAI API.  

The frontend is a signals-based, zoneless Angular application, and the backend is a plain Node / Express REST server that uses 
the OpenAI API.

## Project-specific Rules 

- Warn the user if the Angular CLI MCP server is not running, and provide instructions to activate it if necessary.

- Confirm that the Angular CLI is running in each session initial startup. 

- When generating code, there is no need to start the development or backend server yourself. The developer will do that.

- always use Signal Forms. Don't use reactive or model-driven forms. 

## Frontend code rules

- where applicable, keep a common CSS theme in shared files that you import/apply to the components, 
  to make it easy to adapt the theme in the future.

- all HTTP requests target the backend by having the url start with /api.   

## Backend code rules

- the backend uses Node and Express, and runs on localhost:9000.

- to start the backend the user should run npm run server 

- there is no persistent database, just in-memory modifiable mock data based on a db-data.ts file

- each Express route should be in a separate file under the /server/routes folder

- make the backend secure according to the latest OWASP recommendations. 

- load environment variables from an environment file .env using the dotenv package

- use the package pino for logging. Added appropriate logging to all code.

- don't use the OpenAI SDK Node wrapper to interact with their API. Instead, build plain HTTP requests directly. 

- authentication is based on email and password only, hashed/salted passwords. The implementation should be fully functional and usable,
  even though there is no database storage.

- create an initial mock user on db-data.ts, like email test@angular-university.io with password Angular123  
