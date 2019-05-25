// import Message from '../models/message_model';
import Chat from '../models/chat_model';
import User from '../models/user_model';

// export const saveMessage = (req, res) => {
//   const msg = new Message();

//   msg.text = req.body.text;
//   msg.createdAt = new Date();
//   msg.userId = req.body.userId;
//   msg.chatId = req.body.chatId;

//   Chat.findById(req.body.chatId).then((chat) => {
//     const newArray = chat.messages.slice();
//     newArray.push(msg);
//     chat.messages = newArray;
//     console.log('chat found for message');
//   })
//     .catch((error) => {
//       res.status(500).json({ error });
//     });

//   // msg.save()
//   //   .then(() => {
//   //     res.json({ message: 'Message saved!' });
//   //   })
//   //   .catch((error) => {
//   //     res.status(500).json({ error });
//   //   });
// };

//

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
  // // res.send('posts should be returned');
  console.log('in getChats function');
  Chat.find({}).populate('userId').populate('messages')
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

//

export const getPost = (req, res) => {
  // // res.send('single post looked up');

  // Post.findById(req.params.id)
  //   .then((result) => {
  //     res.send(result);
  //   })
  //   .catch((error) => {
  //     res.status(500).json({ error });
  //   });
};

//

export const deletePost = (req, res) => {
  // // res.send('delete a post here');
  // Post.findByIdAndDelete(req.params.id)
  //   .then(() => {
  //     res.json({ message: 'Post deleted!' });
  //   })
  //   .catch((error) => {
  //     res.status(500).json({ error });
  //   });
};

// Helped Trevor with this part
export const updatePost = (req, res) => {
  // Post.findByIdAndUpdate(req.params.id, req.body)
  //   .then(() => {
  //     Post.findById(req.params.id)
  //       .then((result) => {
  //         res.send(result);
  //       })
  //       .catch((error) => {
  //         res.status(500).json({ error });
  //       });
  //   })
  //   .catch((error) => {
  //     res.status(500).json({ error });
  //   });
};
