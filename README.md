# Music-app

We have created a music application that plays a song based upon responses to questions.

## Basic Overview - [Live Demo] https://marasinipradeep.github.io/music-app/

## user story

As a music lover and someone who enjoys playing games, I want to play a game to help me find a song to listen to, so I can have fun and be inspired to listen to new music.

## Application Features

## Quiz start

The application begins with a title screen and a start button for the user to click to begin the quiz

## Question pages

A series of 4 questions were devised to add a fun element to the application. We created 4 potential responses for each question. These questions appear on the screen after the start button is clicked. GIFs were added to the response buttons to make a fun user experience.

The GIF's are created using the Tenor API. The user's response to the question is allocated a value and that value is then used to construct a URL to be used in an AJAX request from the musixmatch API.
Foundation and Google Fonts were utilised to create the dynamic layout of the application and the effects.

## YouTube Output

After the final of the 4 questions is asked, the user is then shown a Youtube clip of a song we hope they will enjoy. The clip is shown by passing the output of the musixmatch API into the Youtube API to show a song that was formulated from the user's response to the questions.

## Technology used 
```
Google Fonts - https://fonts.googleapis.com
W3 Schools - https://www.w3schools.com/
AJAX - https://ajax.googleapis.com
Tutorials Point - https://www.tutorialspoint.com/index.htm
Foundation - https://get.foundation/
Stack Overflow - https://stackoverflow.com/
MusixMatch API - https://developer.musixmatch.com/
Moment.JS - https://momentjs.com/
JQuery - https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js
Tenor API - https://api.tenor.com
YouTube API - https://developers.google.com/youtube/v3
Github - https://github.com/
```
## A gif of the working application is below:

![demo of music-app](Assets/img/MusicQuizDemo.gif)

Project 1 By Ben Hilliard, Declan Toohey, Jeff Miao, Pradeep Marasini
