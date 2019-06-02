# PassOn

![Team Photo](https://media.giphy.com/media/IWMeKZrchOo5G/giphy.gif)

Learning and social connection on this campus are wrongfully mutually exclusive. 
Constrained by social norms and a lacking infrastructure for nurturing growth, Dartmouth neglects accessing the full potential of its students. 
Prospective students apply to this school as well-rounded, intelligent people and are accepted because of some quality, trait, or aptitude that made them shine brighter than the rest. After acceptance, their unique attributes, while still a part of them, are not given the full social exposure they deserve. 
As current and former Dartmouth students, we believe our unique talents and traits rarely surface in conversation and there are limited social platforms for discovering the true power of this campus. For example, I could be good friends with a world-renowned pianist, ping-pong player, and juggler; yet have no idea of their skills and no way of learning from such great resources. 
Our proposal, PassOn, exists as a social bartering app and subsists on the belief that we all have an innate desire to both learn and share. Learn how to yoyo from a competition-oriented professional, have an hour-long lesson with top-notch musician, hone your tennis abilities with a skilled player: through expensing or trading skills, social interaction, and learning can be combined into one holistic experience. To say that professors are the singular source of knowledge on this campus is a dangerous fallacy. Learning should not be sequestered to the classroom alone, it should be something that students have the opportunity to engage in at any point in their day, from any source. Dartmouth is a hotbed of intellectual, athletic, musical, and creative talent, yet this source of unlimited potential remains largely untapped. 

## Architecture

Code Organization:
* Sign Up
    * Create new users with their names, schools, emails, skills they want to teach, and skills they want to learn.
* Sign In
    * Users will sign in to their accounts.
* Main Page
    * Search for skills you want to learn.
    * Browse through teachers of skills you want to learn.
* Profile Page
    * Each user will have a profile page.
    * The profile page will also be used when being connected to a teacher.
    * It links to the messaging component upon a successful match.
* Messaging 
    * A teacher and student pair can message and coodrinate their meeting.
* Nav Bar
    * Navigate between the home page, your profile page, and your messages and lessons.

Tools & Libraries:
* React Native
    * Frontend
* Express and Mongo
    * Backend
* Web Sockets
    * Messaging
* Firebase and Faceboook API
    * Signing in via Google or Facebook
* Video Player API
    * For users to upload videos
* Geolocation API
    * For location based settings
* Venmo API
    * For exchanging currency

## Setup

Git clone this repository locally. To get the project dev environment up and running, run `yarn install`. Frontend is currently connected to a Heroku hosted mongoDB database, so we wouldn't need to run backend locally. Simply run `expo start` to start an xcode simulator of iphone in order to run the app. If you ever want to make some test changes to backend, git clone `git@github.com:dartmouth-cs52-19S/project-api-passon.git` locally, and change the frontend code in Actions/index.js and Chat.js to localhost accordingly. Run `yarn start` in the api repository to start the server, then run `expo start` to start frontend.

## Deployment

(Adapted from https://instabug.com/blog/react-native-app-ios-android/.)
To deploy the project, first run `expo publish`. Then, you have a choice of building an Android app or an iOS app. To build an Android app, run `expo build:android`. To build an iOS app, run `expo build:ios`. 

## Authors

Created by Julian Grunauer, Zirui Hao, John Sullivan, Gillian Yue, and Catherine Zhao.

## Acknowledgments

Thank you Tim & CS 52!
