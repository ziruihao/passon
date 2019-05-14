import Post from '../models/post_model';

// I found these commands on the Mongoose documentation
// Source: https://mongoosejs.com/docs/queries.html

export const createPost = (req, res) => {
  // res.send('post should be created and returned');

  const post = new Post();

  post.title = req.body.title;
  post.content = req.body.content;
  post.tags = req.body.tags;
  post.cover_url = req.body.cover_url;
  post.author = req.body.author;

  post.save()
    .then(() => {
      res.json({ message: 'Post created!' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

//

export const getPosts = (req, res) => {
  // res.send('posts should be returned');
  console.log('in getPosts function');
  Post.find({})
    .then((result) => {
      // console.log('result is ', result)
      res.send(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

//

export const getPost = (req, res) => {
  // res.send('single post looked up');

  Post.findById(req.params.id)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

//

export const deletePost = (req, res) => {
  // res.send('delete a post here');
  Post.findByIdAndDelete(req.params.id)
    .then(() => {
      res.json({ message: 'Post deleted!' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// Helped Trevor with this part
export const updatePost = (req, res) => {
  Post.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      Post.findById(req.params.id)
        .then((result) => {
          res.send(result);
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
