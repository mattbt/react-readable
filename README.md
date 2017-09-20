Readable: A basic React + Redux content and comment web app
===

React + Redux front-end code to manage, categorize and vote posts and comments.   
Back-end API and data storage is provided by Udacity.   
This project is part of Udacity React Nanodegree Program.   

### Setup
* download the project folder (master branch)
* open your terminal and navigate to project folder
* make sure you have Node.js and npm installed, or get them [here](https://nodejs.org/it/download)
* Install and start the API server
    - `cd api-server`
    - `npm install`
    - `node server`
* In another terminal window
    - `cd frontend`
    - `npm install`
    - `npm start`

A browser window with the working app should open

### App info
The main page contains a list of all categories and posts.   
By selecting a category from the list user gets to category page where only posts of this category gets listed.   
Both pages implements the following features
 - add / edit / delete posts (through a modal window)
 - upvote / downvote post
 - sort posts by score / timestamp
 - go to post detail anchor

![Main page](/screenshots/img1.JPG?raw=true)

Post Detail page contains post data and comments and implements the following features   
 - edit / delete post (through a modal window)
 - upvote / downvote post
 - add / edit / delete comments (through a modal window)
 - upvote / downvote comment

![Edit Comment](/screenshots/img2.JPG?raw=true)
![Post Detail](/screenshots/img3.JPG?raw=true)

## API Server

Information about the API server and how to use it can be found in its [README file](api-server/README.md).
