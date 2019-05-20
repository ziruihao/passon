import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import User from '../models/user_model';
// import Skill from '../models/skill_model';

dotenv.config({ silent: true });

// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}

export const signin = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((result) => {
      res.send({
        user: result,
        token: tokenForUser(req.user),
      });
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

export const signup = (req, res, next) => {
  console.log(`REQ BODY: ${req.body.firstName}`);
  const { firstName } = req.body;
  const { lastName } = req.body;
  const { email } = req.body;
  const { password } = req.body;
  const { university } = req.body;

  if (!firstName || !lastName || !email || !password || !university) {
    return res.status(422).send('You must provide name, email, password, and university.');
  } // also this error-checking can be done in the frontend so we're not sending this to the server

  User.findOne({ email: req.body.email })
    .then((result) => {
      if (result !== null) {
        res.json('User already exists');
      } else {
        const user = new User();

        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.password = req.body.password;
        user.university = req.body.university;

        user.save().populate('learn').populate('teach').then((result2) => {
          res.json({
            user: result2,
            token: tokenForUser(result2),
          }); // send the token for the new user
        })
          .catch((error) => {
            res.status(500).json({ error });
          });
      }
    })
    .catch((error) => {
      res.status(404).json({ error });
    });

  return next;
};


export const getUsers = (req, res) => { // TODO: return based on searched skill
  User.find().populate('learn').populate('teach')
    .then((result) => {
      const removePersonalInfo = Object.assign({}, result);
      removePersonalInfo.password = null;
      removePersonalInfo.email = null;
      res.json(removePersonalInfo);
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

export const getUser = (req, res) => {
  User.findById(req.params.id).populate('learn').populate('teach')
    .then((result) => {
      const removePersonalInfo = Object.assign({}, result);
      removePersonalInfo.password = null;
      removePersonalInfo.email = null;
      res.json(removePersonalInfo);
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

export const deleteUser = (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => {
      res.json({ message: 'User deleted!' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// TO-DO: we need to either make [updateUser] able to add skills or add a separate skills thing
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

// export const addSkill = (req, res) => {
//   User.findById(req.params.id)
//     .then((result) => {
//       result.learn.push({
//         title: req.body.title,
//         years: req.body.years,
//         description: req.body.description,
//       });
//     })
//     .catch((error) => {
//       res.status(500).json({ error });
//     });

//   Skill.findOne({ title: req.body.title })
//     .then((result) => {
//       if (result !== null) {
//         res.json('Skill exists'); // If the email is null

//         result.users.insert(req.body.email);
//       } else {
//         const skill = new Skill();

//         skill.title = req.body.title;
//         skill.users = [req.body._id];

//         skill.save()
//           .then((result2) => {
//             // res.json({ message: 'good' }); // send the token for the new user
//             res.json({ message: 'Skill saved' }); // send the token for the new user
//           })
//           .catch((error) => {
//             res.status(500).json({ error });
//           });
//       }
//     })
//     .catch((error) => {
//       res.status(500).json({ error });
//     });
// };

// export const delSkill = (req, res) => {

// };

// export const getSkill = (req, res) => {

// };

// export const getSkills = (req, res) => {

// };
