// import Message from '../models/message_model';
import Chat from '../models/chat_model';
import User from '../models/user_model';

export const createChat = (req, res) => {
  const chat = new Chat();
  User.find({ email: req.body.email.toLowerCase() }).then((result) => {
    console.log(`other user in chat: ${JSON.stringify(result[0])}`);
    console.log(`self: ${req.user}`);
    chat.userId = [result[0], req.user];
    // first is the other user, second is self
    // second should really be req.user since it's in token in the header
    // right now the react-version local storage is not figured out so
    // we're arbitrarily passing in a user id for self
    chat.messages = req.body.messages;

    chat.save()
      .then(() => {
        // res.json({ message: 'Chat created!!' });
        console.log('chat created! ');
      })
      .catch((error) => {
        res.status(500).json({ error });
        console.log('chat create failed!');
      });
  });
};

export const getChats = (req, res) => {
  Chat.find({}).populate('userId').populate('messages')
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};


export const getChat = (req, res) => {
  const selfId = req.user.id;
  console.log(`selfID: ${selfId} otherID: ${req.params.id}`);

  Chat.find({ userId: { $all: [selfId, req.params.id] } }).populate('userId').populate('messages')
    .then((result) => {
      if (result == null) {
        Chat.find({ userId: { $all: [req.params.id, selfId] } }).populate('userId').populate('messages')
          .then((result2) => {
            if (result2 != null) {
              console.log(`in getChat function, chat found: ${result}`);
              res.send(result2);
            }
          })
          .catch((error) => {
            res.status(500).json({ error });
          });
      }
      if (result != null) {
        console.log(`in getChat function, chat found: ${result}`);
      }
      res.send(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
