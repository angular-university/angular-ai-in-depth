
# About these prompts

These are the prompts that you will be needing throughout the course.

Claude doesn't know about them due to .claudeignore. So you have to paste them in one by one the Claude prompt.

These prompts follow the exact sequence used in the course, where we split things up in separate steps for educational purposes.

Each prompt is large enough that the AI does several things in one go, while remaining small enough for a human to easily verify its output.


# Create the UI part of the chat home screen

based on screenshots /ui-screenshots/chat-initial-state-no-history.png and /ui-screenshots/chat-conversation-ongoing-history-filled.png create the home screen.

The route of this screen should be /home, and the user should be redirected to if it accesses a path that does not match any route.

The home screen has a left navigation panel with the chat history that is collapsible, and a logout button in the bottom.

There is an initial state where the logo /public/images/angular-ai-course-logo.png gets displayed in the center of the screen, that initial state corresponds to file /ui-screenshots/chat-initial-state-no-history.png

Then once the conversation starts, the screen looks like /ui-screenshots/chat-conversation-ongoing-history-filled.png.

Don't do backend calls and focus purely on the visual part. add some mock data in a separate file simulating several conversations, each with several chat messages and their reply.

Make the home screen responsive, center the content in the middle of the screen.

the collapsible side menu should be a separate component. the chat history, the initial state and the conversation thread should also be separate components.

Extract CSS theme variables like background colors to a separate theme file that can easily reused across components.

# split models into separate files

@src/app/home/home.model.ts split these
models into separate files. Always put models
in separate files in the future.

# fix component prefixes

remove the app- prefix from all component selectors, and don't add any prefix in the
future

# avoid view query decorators 

@src/app/home/conversation-thread/ replace the use of the decorator @ViewChild by it's signal-based 
alternative viewChild. In general, avoid decorators for view queries and prefer the
signal-based versions. Remember this for the future.

# fix layout issues 

start the frontend with npm start on 4200, and take screenshots of the chat home page with
pupeteer and iterate on it until it matches closely the design. fix the layout issues.

# fix layout issues again 

start the server and use pupeteer again, but this
time open the collapsed panel and click on a
conversation. Notice that the messages are not properly centered. Maybe a max-width is needed for
the messages container. Iterate using pupetter until it's fixed.

# fix UI via provided screenshot 

@ui-screenshots/ui-issues/ check these two issues
and fix them. The right logo to use in both cases is @public/images/angular-university-profile-picture.png

# make the screen responsive 

make the home page responsive, and extract the responsive theme to a separate 
file so that we can easily make every screen on the application responsive 
in the future. Extract also any styles can be reused to recreate a similar layout.

## create a node backend skeleton

Inside a /server folder, create an express server with a single root route 
 that just prints out a very basic server running confirmation HTML page.

Make the server port taken from an environment variable PORT otherwise 
use a default port 9000 for development.

Add a command npm run server to start the server.  
make the command start the server in development mode, where the server 
reloads when a server file changes.

# create retrieve chat history endpoint

create a GET /api/get-chat-history endpoint that retrieves all chat history 
from the in-memory DB. 

This only retrieves the conversation one-line summary, but not the full conversation thread.

# create retrieve conversation endpoint

create a /api/get-chat-conversation endpoint to retrieve a single conversation based on id.

it should return a single conversation, with all it's chat messages.

The messages of role 'system' should be filtered out. 

The conversation should be retrieved by id, based on a path variable.

# start conversation backend endpoint

Implement a /api/start-conversation route in the backend. This endpoint should take a prompt Id 
from the request body, and use it to retrieve an initial system prompt from a prompts.ts file.

The goal is that the system prompt cannot be manipulated by the frontend user. 
The system prompt should limit the AI to answer Angular questions, and nothing more.

Then create an Open AI API conversation with the system prompt at the start 
followed by the user initial message, taken from the request body. 

Save the conversation in an in-memory store in db-data.ts and create a conversation Id.

notice that there is no need to save the system prompt in the database. 

The conversation should be linked to the system prompt only via the prompt Id. 

This way the system prompt will never reach the frontend accidentally.

Also, we can change the system prompt if needed.

send the conversation to open AI using the Open AI API, and grab a response from Open AI. 

send only the AI response back to the user in the response body, together with the 
conversation Id.

When calling the OpenAI API, just do a plain HTTP request using a promise-based HTTP 
client and async await. Don't use any open AI third party node package wrapper.

Don't worry about authentication for now, we will implement it later.

Don't mention OpenAI in the response names, etc. we might change it to another AI provider 
in the future.

# create continue conversation endpoint

Create a /api/continue-conversation backend endpoint.  

takes in the request body the conversation Id and the next user message.

Retrieves the conversation from the in-memory DB, appends the new user message and send everything 
to OpenAI to get a new AI reply.

Saves the conversation in in-memory db, and return the last AI response.~~

# add logging

Add appropriate logging to all backend endpoints, so that it's easy to 
debug and troubleshoot what is going on in case of error. 

Include logging in error scenarios as well. 

# use chat history endpoints in frontend

create a frontend service ChatHistoryService with two async methods: getAllConversations() 
that calls /api/get-chat-history and getConversationById()that calls /api/get-chat-conversation

The history chat list on the side menu should be retrieved via getAllConversations().

when clicking on a conversation on the list, the conversation should be returned by id 
from the getConversationById() method.

# connect the start and continue endpoints to the frontend

when starting a new conversation in the frontend, call the backend start-conversation endpoint, 
and show the local loading indicator while waiting for a reply.

display the AI response. when continuing the conversation, call the continue conversation endpoint.

# remove chat history mock data 

in the backend, don't return any mock data for conversations history.

But don't delete the mock data, keep it around in case it's needed. Just don't use it. 

# fix scroll to bottom chat logic

When a new AI reply is retrieved with a lot of text, 

the chat is not getting correctly scrolled to the bottom.

# Create authentication screens

Based on the UI screenshots available in the /ui-screenshots folder, 
generate the frontend Angular part of just the sign-in and sign up screens.

Use sign-in-screen.png and sign-up-screen.png and create those screens. 
Don't make any API or service calls, focus on creating the Angular components 
with the correct HTML and CSS.

The two screens have very similar styles, refactor common parts into a common scss file.

You can find the images you need in the public/images folder. 

The left image above "Angular AI In Depth" is
angular-ai-course-logo.png, while the Angular University logo used inside the right-side box 
is angular-university-logo.svg

# fix auth screens layout issue

@ui-screenshots/ui-issues/ui-issue-3-layout-not-centered.png
both the login and the sign up screens have this problem, the UI is not 
centered. 

It didn't work. Didn't do anything. Suggestion - add a max-width 
in desktop screens, and stack things vertically on mobile. 
Iterate with pupeteer.

# fix authentication forms

In both the sign up and login screens, an Angular form was not used.

Refactor both screens into using the latest Angular Signal Forms. 

# add custom form field validator

In the sign up screen only, we need an Angular signal forms custom 
field validator that checks if the password and confirm password fields
are identical. 

ensure the password mismatch error is displayed if the two fields don't 
match. display the error next to the confirm password field.

Make sure when the buttons Login and Sign Up are disabled, that the disabled 
state is clearly visible to the user. Make the buttons greyed out.

# add authentication route to the backend server

Add an authentication backend endpoint mapped to url /api/sign-in that takes in an email 
and password, and authenticates the user.

Add some mock data for the user, with email test@angular-university.io and password angular.

Make the passwords hashed and salted according to the latest OWASP recommended standards.

Don't modify any frontend code, this is purely a backend task.

The backend service /api/sign-in should return a signed JWT in its response, 
besides the user profile itself.

use HS256 JWTs, assume the key is on the .env file. 

Add a sample  key to .env and .env.example.

The JWT secret should be taken from the environment variable JWT_SECRET

# Add user creation route to the backend server

Add an authentication backend user creation endpoint mapped to 
the url /api/sign-up that takes in an email and password, 
creates a new user and adds it to the in-memory data store.

The backend response should return both the user profile and a JWT. 

# reusable user messages component

create a reusable user messages component that allows to display errors to the user in a 
top message horizontal bar on top of the screen.

The messages bar should be closeable. It should also allow to display informational messages 
and warnings, as well as success messages.

apply the messages component in one single place, the application root component.

# reusable user messages service

create a shared signals-based user messages service that can be used by any screen to 
interact with the user messages component.

Add a clear all method. 

# loading indicator

create a reusable loading indicator Angular component that can be used anywhere
on the application.  Use the gif available in public/images/loading-indicator.gif

# global loading indicator

use the reusable loading indicator just created to create a global loading indicator
that gets shown whenever a router transition is ongoing.

created a shared stateful signal-based GlobalLoadingService that can be used to
turn on and off the global loading indicator from anywhere in the application.

# implement frontend authentication

Create an angular AuthService that has a sign-in  method, that calls the sign in 
backend endpoint.

Handle authentication error scenarios properly by displaying an error message to the user. 
If authentication is successful, send the user to the home screen.

Use the service to implement the sign in screen.

on the sign-in screen, retrieve the JWT from the response and store it in local storage, 
to allow future requests to be validated by the server.

store the user profile and the token separately in local storage.

to make the user profile available everywhere in the application, create a shared 
singleton UserProfile service, and set it with the user information.

the user profile service should reload the profile from local storage between refreshes.

# fix user profile and auth services 

the user profile and the auth service are mixing responsibilities. 

the auth service should not depend on the user profile service. Instead, it should set
the profile and token directly in local storage.

You can put the key names in a shared file. 

the user profile should not allow its client component to set the profile. 

It should just read it from local storage and make it available. 

The clear method should clear the profile from memory, but not from local storage. 

# prevent form submission

The sign-in button is currently submitting the form, causing an 
accidental page reload. 

Look up how to fix in Angular Signal Forms.

# add a delay to auth endpoints

add a small delay to the sign in and user creation backend endpoints, 
so that we see the loading indicator on the frontend

use the global loading indicator on the sign-in screen

# Http loading interceptor

create and plug in a global http interceptor that turns on the global loading indicator 
when the request starts and turns it off when the request completes successfully or fails.

use the GlobalLoadingService to communicate with the global loading indicator. 
make sure the ConversationService does not Trigger the global loading indicator.

Refactor the sign-in screen, to remove the use of the global loading service,
as it's no longer necessary.


# Authentication HTTP interceptor

create an HTTP interceptor that takes the JWT from local storage and appends it in a 
header to every request sent to the server.

# implement frontend user creation

Add a createUser method to AuthService, and call it in the sign-up screen. 
If the user is created successfully send it to home screen, otherwise display an error.

store the user profile and token on local storage, just like in the sign-in screen.

# implement logout

add a logout method to the authentication service. 
implement the logout button, redirect to login page and clear profile and token 
from local storage.

# Create an authentication middleware

Create a middleware that ensures the request contains a valid JWT, and that 
a user is correctly logged in. Make the user Id available in the request. 

Apply the middleware to the start conversation and continue conversation routes.

Apply the middleware also to the get chat history and get chat conversation endpoints.

for all those endpoints add a userId property to the data saved in the database.
















