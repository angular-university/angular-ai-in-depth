
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

