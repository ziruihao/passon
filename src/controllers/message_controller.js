import Message from '../models/message_model';
import Chat from '../models/chat_model';
import User from '../models/user_model';
// import User from '../models/user_model';

export const saveMessage = (req, res) => {
  const msg = new Message();

  msg.text = req.body.text;
  msg.createdAt = new Date();
  msg.userId = req.body.userId;
  msg.chatId = req.body.chatId;

  msg.save()
    .then(() => {
      res.json({ message: 'Message saved!' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

//

export const createChat = (req, res) => {
  const chat = new Chat();
  const user1 = new User(); // fetching from req.body.userId
  const user2 = new User(); // fetching from req.user
  chat.userId = [user1, user2];
  // first is the other user, second is self
  // second should really be req.user since it's in token in the header
  // right now the react-version local storage is not figured out so
  // we're arbitrarily passing in a user id for self
  chat.messages = req.body.messages;
  console.log(`req: ${JSON.stringify(req.body)}`);
  console.log(`chat: ${chat}`);

  chat.save()
    .then(() => {
      res.json({ message: 'Chat created!' });
      console.log('chat created! ');
    })
    .catch((error) => {
      res.status(500).json({ error });
      console.log('chat create failed!');
    });
};

export const getChats = (req, res) => {
  // // res.send('posts should be returned');
  // console.log('in getPosts function');
  Chat.find({})
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
