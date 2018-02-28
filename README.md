# Software Developer Challenge
## UI Photos
![Sample UI](./images/login.png?raw=true "Sample UI")

![Sample UI](./images/search.png?raw=true "Sample UI")

## Architecture

The frontend is written in Angular 5 with Redux and Angular Material. 

The backend is written in LoopBack with MongoDB for a database. LoopBack's built in memory database is used to cache viewed item history. The cache database can easily be swapped out for other in memory databases (ie redis) using LoopBack's connectors.

![Architecture](./images/architecture.png?raw=true "Architecture")

## How To Run!

1. Install dependencies for front end and run

    ```cd webapp```

    ```npm install```

    ```npm start```

2. In a separate shell, install dependencies for backend and run

    **PREREQUISITE** Install MongoDB and ensure mongod is on your path!
    [MongoDB Download](https://www.mongodb.com/download-center#community)

    ```npm install```

    Run appropriate start script for your environment
    ```mkdir db```

    ```npm run start-windows```

    ```npm run start-unix```

3. Browse to [http://localhost:4200](http://localhost:4200)

    If you need to change connection information for your database, connection settings can be found in 

    ```backend/server/datasources.json```

    More information on configuring LoopBack datasources can be found [here](https://loopback.io/doc/en/lb2/Connecting-models-to-data-sources.html)

    If you need to change the URLs for Angular Services, the URLs can be found in 
    
    ```webapp/src/services/variables.ts```

## Challenge 1: 
Read through the rest of the assignment, decide which technologies to use and explain why you chose what you chose. As a reminder we at Paytm are dealing with millions of concurrent users, just sayin’ :)

<span style="color:blue"> AngularJS - Robust, popular, has great built in features, native support for TypeScript!</span>

<span style="color:blue"> LoopBack - Supports many different types of backends, scales well, easy to configure, excellent community and enterprise support.</span>

<span style="color:blue"> MongoDB - Excellent scaling, works well for changing data structures</span>

## Challenge 2: 
Create a deployable “Hello World” Server exposing simple REST “Hello World” API. It is going to be a base for your application for this assignment.


## Challenge 3:
Pick one of the available online API’s such as Twitter (https://dev.twitter.com/overview/api), LCBO (https://lcboapi.com/) or Weather (https://openweathermap.org/api), create and implement a flow involving that API and user of your application. For example, your application might have following UI:

<span style="color:blue"> Using the LCBO API to create an application to browse for your favourite booze! You can search and view prices and pictures. When you click on a thumbnail it will remember your viewing history and display 'Viewed' on the cards.</span>


## Challenge 4:
Make your application secure and personalized by making people to have to sign-up / login. Bonus points, if users will be able to reset their passwords.

<span style="color:blue"> LoopBack provides these services. Sign-up and login have been implemented in the Angular app.</span>

## Challenge 5:
Make your application persistent. Whatever functionality your application has, after restart, make it possible to view a history of user activity or anything else you deem necessary.

<span style="color:blue"> The application will persist your credentials as well as your viewing and search history.</span>
## Challenge 6:
Test your application.

## Challenge 7:
Let us know how we can use it. You could either provide us with a zipped file containing your solution or a link to your Github repository containing one.

## Bonus (optional):
Add an “I’m feeling lucky button” that does a random search, but make sure that same result is not returned twice or that you don’t return a page that the user already viewed. Use the user stored history to do so. Since going through the history can potentially be costly, suggest and optionally implement optimization mechanism to avoid hitting the storage every time.

<span style="color:blue"> The challenge here was to determine what information the user had already seen, without hitting the database on each request. I have implemented the functionality of showing which items have previous been viewed, when the user performs a search. (The same challenge as an I'm feeling lucky button).</span>

<span style="color:blue">A mechanism has been implemented using an in memory database (the built in LoopBack one, can easilybe swapped for redis through a config file).</span>

<span style="color:blue">Using a combination of LoopBack mixins and hooks the cache is populated on user login, updated with data when we store history to the database, and we compare to it when a user makes a search through the LCBO API.</span>
