
# About these prompts

These are the prompts that you will be needing throughout the course.

Claude doesn't know about them due to .claudeignore. So you have to paste them in one by one the Claude prompt.

These prompts follow the exact sequence used in the course, where we split things up in separate steps for educational purposes.

Each prompt is large enough that the AI does several things in one go, while remaining small enough for a human to easily verify its output.

## Prompt 1 - Create application layout and auth screens  

Based on the UI Figma screenshots available in the /ui-screenshots folder, generate the frontend Angular part of just the sign in and sign up screens.

Use sign-in-screen.png and sign-up-screen.png and create those screens. Don't make any API or service calls, focus on creating the Angular components with the correct HTML and CSS. 

The two screens have very similar styles, refactor common parts into a common scss file.

You can find the images you need in the public/images folder. The left image above "Angular AI In Depth" is 
angular-ai-course-logo.png, while the Angular University logo used inside the right-side box is angular-university-logo.svg 

## Prompt 2 - set application fonts

Use the Inter font everywhere. 

## Prompt 3 - correct UI layout, make it responsive 

Make all screens responsive in the sense that they centered in  
the middle in a desktop view. make the responsive styles reusable where applicable. 

## Prompt 4 - create a node backend skeleton 

Inside a /server folder, create an express server with a single root route / that just prints out a very basic server running confirmation HTML page.

Make the server port taken from an environment variable PORT otherwise use a default port 9000 for development. 

Add a command npm run server to start the server. 

# Prompt 5 - add authentication route to the backend server

Add an authentication backend endpoint mapped to url /api/sign-in that takes in an email and password, and authenticates the user.

Add some mock data for the user, with email test@angular-university.io and password angular. 

Make the passwords hashed and salted according to the latest recommended standards. 

Don't modify any frontend code, this is purely a backend task.

# Prompt 6 - add user creation route to the backend server

Add an authentication backend user creation endpoint mapped to url /api/sign-up that takes in an email and password, creates a new user and adds to the in-memory data store.

# Prompt 7 - loading indicator

create a reusable loading indicator Angular component that can be used anywhere on the application.  use the gif available in public/images/loading-indicator.gif

# Prompt 8 - global loading indicator

use the reusable loading indicator just created to create a global loading indicator that gets shown whenever a router transition is ongoing.

created a shared stateful signal-based GlobalLoadingService that can be used to turn on and off the global loading indicator from anywhere in the application.

# Prompt 9 - reusable user messages component

create a reusable user messages component that allows to display errors to the user in a top message horizontal bar on top of the screen.

The messages bar should be closeable. It should also allow to display informational messages and warnings.

apply the messages component in one single place, the application root component.

# Prompt 10 - reusable user messages service

create a shared signals based user messages service that can be used by any screen to interact with the user messages component.

# Prompt 11 - Http loading interceptor

create and plug in a global http interceptor that turns on the global loading indicator when the request starts and turns it off when the request completes successfully or fails.

use the GlobalLoadingService to communicate with the global loading indicator.

# Prompt 12 - implement frontend authentication 

Create an angular AuthService that has a sign method, that calls the sign in backend endpoint.

Handle authentication error scenarios properly by displaying an error message to the user. If authentication is successful, send the user to the home screen.

Use the service to implement the sign in screen.

# Prompt 13 - implement front user creation logic 

Add a createUser method to AuthService, and call it in the sign-up screen. If the user is created sucessfully send it to home screen, otherwise display an error. 

# Prompt 14 - Add JWT-based authentication 

The backend service /api/sign-in should return a signed JWT in its response, besides the user profile itself.  

use HS256 JWTs, assume the key is on the .env file. Add a sample  key to .env and .env.example.

# Prompt 15 - Make create user route JWT based  

Make the /api/sign-in route also JWT-based.

# Prompt 16 - Adapt frontend to store JWTs

on the sign-in screen, retrieve the JWT from the response and store it in local storage, to allow future requests to be validated by the server.

store the user profile and the token separately in local storage. 

to make the user profile available everywhere in the application, create a shared singleton UserProfile service, and set it with the user information.

do the same for the sign-up screen.

the user profile service should reload the profile from local storage between refreshes.

# Prompt 14 - add authentication guard

Create an authentication guard that redirects the user to the sign in screen if not properly authenticated. 

use the UserProfile service to know if the user is logged in or not. apply the guard to the home screen only. 

# Prompt 15 - Authentication HTTP interceptor

create an HTTP interceptor that takes the JWT from local storage and append it in a header to every request sent to the server. 

# Prompt 16 - add confirm password form error

on the sign up screen, show and error message and disable the form if the passwords don't match. use a form validator. put it in an external file. 

# create the UI part of the chat home screen

based on screenshots /ui-screenshots/chat-initial-state-no-history.png and /ui-screenshots/chat-conversation-ongoing-history-filled.png create the home screen. 

The home screen has a left navigation panel with the chat history that is collapsible, and a logout button in the bottom. 

There is an initial history where the logo /public/images/angular-ai-course-logo.png gets displayed in the center of the screen, that initial state corresponds to file /ui-screenshots/chat-initial-state-no-history.png

Then once the conversation starts, the screen looks like /ui-screenshots/chat-conversation-ongoing-history-filled.png. 

Don't do backend calls and focus purely on the visual part. add some mock data in a separate file simulating several conversations, each with several chat messages and their reply. 

Make the home screen responsive, center the content in the middle of the screen.

the collapsible side menu should be a separate component. the chat history, the initial state and the conversation thread should also be separate components.   

# implement logout

add a logout method to the authentication service. implement the logout button, redirect to login page and clear profile and token from local storage.

# start conversation backend endpoint

Implement a /api/start-conversation route in the backend. This endpoint should a prompt Id from the request body, and use it to retrieve an initial system prompt from a prompts.ts file.

The goal is that the system prompt cannot be manipulated by the frontend user. The system prompt should limit the AI to answer Angular questions, and nothing more.

Then create an Open AI API conversation with the system prompt followed by the user initial message, taken from the request body. Save the conversation in an in-memory store in conversations-db.ts and create a conversation Id.

send the conversation to open AI using the Open AI API, and grab a response from Open AI. send only the AI response back to the user in the response body, together with the conversation Id.

When calling the OpenAI API, just do a plain HTTP request using a promise-based HTTP client and async await. Don't use any open AI third party node package wrapper.

Don't worry about authentication for now.

Don't mention OpenAI in the response names, etc. we might change it to another AI provider in the future.

# refactor 

refactor the logic to get a completion based on a conversation into a separate reusable async function  

# create an authentication middleware 

create a middleware that ensure the request contains a valid JWT. Apply the middleware to the start-conversation route only.
