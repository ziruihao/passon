import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import User from '../models/user_model';

dotenv.config({ silent: true });

// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}

export const signin = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((result) => {
      res.send({ token: tokenForUser(req.user), username: result.username });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

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


export const getUsers = (req, res) => { // TODO: return based on searched skill
  User.find({}).then((result) => {
    res.send(result);
  }).catch((error) => {
    res.status(500).json({ error });
  });
};

export const getUser = (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const deleteUser = (req, res) => {
  // res.send('delete a post here');
  User.findByIdAndDelete(req.params.id)
    .then(() => {
      res.json({ message: 'User deleted!' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const updateUser = (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      User.findById(req.params.id)
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
