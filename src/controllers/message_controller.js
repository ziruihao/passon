import Message from '../models/message_model';
// import Chat from '../models/chat_model';

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

export const getPosts = (req, res) => {
  // // res.send('posts should be returned');
  // console.log('in getPosts function');
  // Post.find({})
  //   .then((result) => {
  //     // console.log('result is ', result)
  //     res.send(result);
  //   })
  //   .catch((error) => {
  //     res.status(500).json({ error });
  //   });
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
