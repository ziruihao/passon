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

dotenv.config({ silent: true });

// DB Setup
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/passon';
mongoose.connect(mongoURI);
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
app.listen(port);

console.log(`listening on: ${port}`);

app.use('/api', apiRouter);


// SOCKET

const http = require('http');
const socketio = require('socket.io');

const app2 = express();
// eslint-disable-next-line new-cap
const server = http.Server(app2);
const io = socketio(server);
server.listen(3000, () => console.log('listening on *:3000'));

// The event will be called when a client is connected.
io.on('connection', (socket) => {
  console.log('A client just joined on', socket.id);
  socket.on('room', (room) => {
    console.log(`client joined room: ${room}`);
    socket.join(room);
  });
  socket.on('message', (message) => {
    console.log(`message received: ${JSON.stringify(message)} on socket ${socket.id}`);
    socket.broadcast.emit('received', { message });
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
