
# About these prompts

These are the prompts that you will be needing throughout the course.

Claude doesn't know about them due to .claudeignore. So you have to paste them in one by one the Claude prompt.

These prompts follow the exact sequence used in the course, where we split things up in separate steps for educational purposes.

In a production application, feel free to group them together.  

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

Add an authentication /api/sign-in backend endpoint that takes in an email and password, and authenticates the user.

Add some mock data for the user, with email test@angular-university.io and password angular. 

Make the passwords hashed and salted according to the latest recommended standards. 

Don't modify any frontend code, this is purely a backend task.






