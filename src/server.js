/* eslint-disable new-cap */
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import apiRouter from './router';
// import * as Message from './controllers/message_controller';
import Message from './models/message_model';
import Chat from './models/chat_model';
import User from './models/user_model';
import Skill from './models/skill_model';

dotenv.config({ silent: true });

const setUpDB = () => {
  const self = new User();
  self.firstName = 'Pass';
  self.lastName = 'On';
  self.email = 'passon';
  self.password = 'password';
  self.university = 'Dartmouth';
  self.learn = [];
  self.teach = [];
  let skill = new Skill();
  skill.title = 'Golf';
  skill.bio = 'I can teach golf.';
  skill.years = 5;
  skill.save().then((saved) => {
    self.teach.push(saved);
    skill = new Skill();
    skill.title = 'Painting';
    skill.bio = 'I want to learn how to oil paint!';
    skill.save().then((saved2) => {
      self.learn.push(saved2);
      skill = new Skill();
      skill.title = 'Coding';
      skill.bio = 'I want to learn how to code.';
      skill.save().then((saved3) => {
        self.learn.push(saved3);
        self.save();
      });
    });
  });

  const zirui = new User();
  zirui.firstName = 'Zirui';
  zirui.lastName = 'Hao';
  zirui.email = 'zirui';
  zirui.password = 'password';
  zirui.university = 'Dartmouth';
  zirui.learn = [];
  zirui.teach = [];
  skill = new Skill();
  skill.title = 'Coding';
  skill.years = 30;
  skill.ratings = [];
  skill.bio = 'I can teach full-stack! HTML, CSS, JS, React, Express, MongoDB.';
  skill.save().then((saved) => {
    zirui.teach.push(saved);
    skill = new Skill();
    skill.title = 'Painting';
    skill.years = 5;
    skill.ratings = [];
    skill.bio = 'I have painted as a hobby for over 5 years.';
    skill.save().then((saved2) => {
      zirui.teach.push(saved2);
      skill = new Skill();
      skill.title = 'Baseball';
      skill.bio = 'I want to learn baseball.';
      skill.save().then((saved3) => {
        zirui.learn.push(saved3);
        zirui.save();
      });
    });
  });

  const zirui2 = new User();
  zirui2.firstName = 'Vincent van';
  zirui2.lastName = 'Gogh';
  zirui2.email = 'vvg';
  zirui2.password = 'password';
  zirui2.university = 'Dartmouth';
  zirui2.learn = [];
  zirui2.teach = [];
  skill = new Skill();
  skill.title = 'Coding';
  skill.years = 5;
  skill.ratings = [];
  skill.bio = 'I can teach coding.';
  skill.save().then((saved) => {
    zirui2.teach.push(saved);
    skill = new Skill();
    skill.title = 'Painting';
    skill.years = 8;
    skill.ratings = [];
    skill.bio = 'I am an award-winning artist that loves to teach painting.';
    skill.save().then((saved2) => {
      zirui2.teach.push(saved2);
      skill = new Skill();
      skill.title = 'Baseball';
      skill.bio = 'I want to learn baseball.';
      skill.save().then((saved3) => {
        zirui2.learn.push(saved3);
        zirui2.save();
      });
    });
  });

  const john = new User();
  john.firstName = 'John';
  john.lastName = 'Sullivan';
  john.email = 'john';
  john.password = 'password';
  john.university = 'Dartmouth';
  skill = new Skill();
  skill.title = 'Baseball';
  skill.years = 5;
  skill.ratings = [];
  skill.bio = 'I can teach insane baseball.';
  skill.save().then((saved) => {
    john.teach.push(saved);
    skill = new Skill();
    skill.title = 'Golf';
    skill.years = 5;
    skill.ratings = [];
    skill.bio = 'I can teach golf.';
    skill.save().then((saved2) => {
      john.teach.push(saved2);
      skill = new Skill();
      skill.title = 'Painting';
      skill.bio = 'I want to learn how to paint people.';
      skill.save().then((saved3) => {
        john.learn.push(saved3);
        john.save();
      });
    });
  });

  const cat = new User();
  cat.firstName = 'Cat';
  cat.lastName = 'Zhao';
  cat.email = 'cat';
  cat.password = 'password';
  cat.university = 'Dartmouth';
  skill = new Skill();
  skill.title = 'Painting';
  skill.years = 2;
  skill.ratings = [];
  skill.bio = 'I paint everyday, usually landscape paintings.';
  skill.save().then((saved) => {
    cat.teach.push(saved);
    skill = new Skill();
    skill.title = 'Golf';
    skill.bio = 'I want to learn golf.';
    skill.save().then((saved2) => {
      cat.learn.push(saved2);
      cat.save();
    });
  });

  const julian = new User();
  julian.firstName = 'Julian';
  julian.lastName = 'Grunauer';
  julian.email = 'julian';
  julian.password = 'password';
  julian.university = 'Dartmouth';
  skill = new Skill();
  skill.title = 'Coding';
  skill.years = 5;
  skill.ratings = [];
  skill.bio = 'I can teach coding.';
  skill.save().then((saved) => {
    julian.teach.push(saved);
    skill = new Skill();
    skill.title = 'Tennis';
    skill.bio = 'I want to learn tennis.';
    skill.save().then((saved2) => {
      julian.learn.push(saved2);
      julian.save();
    });
  });

  const gillian = new User();
  gillian.firstName = 'Gillian';
  gillian.lastName = 'Yue';
  gillian.email = 'gillian';
  gillian.password = 'password';
  gillian.university = 'Dartmouth';
  skill = new Skill();
  skill.title = 'Tennis';
  skill.years = 5;
  skill.ratings = [];
  skill.bio = 'I can teach tennis.';
  skill.save().then((saved) => {
    gillian.teach.push(saved);
    skill = new Skill();
    skill.title = 'Coding';
    skill.bio = 'I want to learn coding.';
    skill.save().then((saved2) => {
      gillian.learn.push(saved2);
      gillian.save();
    });
  });
};

// DB Setup
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/passon';
mongoose.connect(mongoURI, () => { // this code clears the database on every server run
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => {
      mongoose.connect(mongoURI);
      console.log('reconnected');
      setUpDB();
      console.log('default db set up');
    });
  });
});
// set mongoose promises to es6 default
mongoose.Promise = global.Promise;


// initialize
const app = express();

// enable/disable cross origin resource sharing if necessary
app.use(cors());

// enable/disable http request logging
app.use(morgan('dev'));

// enable only if you want templating
app.set('view engine', 'ejs');

// enable only if you want static assets from folder static
app.use(express.static('static'));

// this just allows us to render ejs from the ../app/views directory
app.set('views', path.join(__dirname, '../src/views'));

// enable json message body for posting data to API
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// additional init stuff should go before hitting the routing

// default index route
app.get('/', (req, res) => {
  res.send('hi');
});

// START THE SERVER
// =============================================================================
const port = process.env.PORT || 9090;
// app.listen(port);

console.log(`listening on: ${port}`);

app.use('/api', apiRouter);

// SOCKET

const http = require('http');
const socketio = require('socket.io');

const server = http.Server(app);
const io = socketio(server); // .listen(3000, () => console.log('listening on *:3000'));
server.listen(port);

// The event will be called when a client is connected.
io.on('connection', (socket) => {
  console.log('A client just joined on', socket.id);
  socket.on('room', (room) => {
    console.log(`client joined room: ${room}`);
    socket.join(room);
  });
  socket.on('message', (message) => {
    console.log(`message received: ${JSON.stringify(message)} on socket ${socket.id}`);
    socket.broadcast.emit('received', message);
    const chatMessage = new Message({
      text: message.body.text,
      createdAt: new Date(),
      userId: message.body.userId,
      chatId: message.body.chatId,
    });
    chatMessage.save().then((result) => {
      console.log('chat message saved');

      Chat.findById(message.body.chatId).then((chat) => {
        const newArray = chat.messages.slice();
        newArray.push(chatMessage);
        chat.messages = newArray;
        chat.save().then(() => {
          console.log(`msg stored in chat${newArray}`);
        });
      })
        .catch((error) => {
          console.log(error);
        });
    })
      .catch((error) => {
        console.log('chat message save failed');
      });
  });
});
