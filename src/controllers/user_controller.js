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
