import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import User from '../models/user_model';

dotenv.config({ silent: true });

// encodes a new token for a user object
function tokenForUser(user) {
  // console.log("here");
  const timestamp = new Date().getTime();
  console.log('here');
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}

export const signin = (req, res) => {
  console.log('here');
  console.log(res);

  User.findOne({ email: req.body.email })
    .then((result) => {
      res.send({ token: tokenForUser(req.user), username: result.username });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// Source: I discussed this part extensively with Trevor and RJ
export const signup = (req, res, next) => {
  const { username } = req.body;
  const { email } = req.body;
  const { password } = req.body;

  if (!username || !email || !password) {
    return res.status(422).send('You must provide email and password');
  }

  User.findOne({ email: req.body.email })
    .then((result) => {
      if (result !== null) {
        res.json('User already exists'); // If the email is null
      } else {
        const user = new User();

        user.username = req.body.username;
        user.email = req.body.email;
        user.password = req.body.password;

        user.save()
          .then((result2) => {
            // res.json({ message: 'good' }); // send the token for the new user
            res.json({ token: tokenForUser(result2), username: user.username }); // send the token for the new user
          })
          .catch((error) => {
            res.status(500).json({ error });
          });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });

  return next;
};

export const createUser = (req, res) => {
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

export const getUsers = () => {
  console.log("get users called");
  res.send({ message: "hello" });
};

//

export const getUser = (req, res) => {
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

export const deleteUser = (req, res) => {
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
export const updateUser = (req, res) => {
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