import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import User from '../models/user_model';
import Skill from '../models/skills_model';

dotenv.config({ silent: true });

// THE FOLLOWING FUNCTIONS DEAL WITH HANDLING USERS

// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}

export const signin = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((result) => {
      res.send({ token: tokenForUser(req.user) });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// Signs up a user and generates a token for them
export const signup = (req, res, next) => {
  console.log(`REQ BODY: ${req.body.firstName}`);
  const { firstName } = req.body;
  const { lastName } = req.body;
  const { email } = req.body;
  const { password } = req.body;
  const { university } = req.body;

  if (!firstName || !lastName || !email || !password || !university) {
    return res.status(422).send('You must provide name, email, password, and university.');
  }

  User.findOne({ email: req.body.email })
    .then((result) => {
      if (result !== null) {
        res.json('User already exists'); // If the email is null
      } else {
        const user = new User();

        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.password = req.body.password;
        user.university = req.body.university;

        user.save()
          .then((result2) => {
            // res.json({ message: 'good' }); // send the token for the new user
            res.json({ token: tokenForUser(result2) }); // send the token for the new user
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

// Gets all users (modified so that it does not return any password information; add other fields to return as needed
export const getUsers = (req, res) => { // TODO: return based on searched skill
  User.find({}).then((result) => {
    const out = [];

    result.forEach((elem) => {
      out.push({
        firstName: elem.firstName,
        lastName: elem.lastName,
        email: elem.email,
      });
    });

    // DO NOT WANT TO DIRECTLY SEND RESULT, IT WOULD CONTAIN PASSWORD INFO

    res.send(out);
  }).catch((error) => {
    res.status(500).json({ error });
  });
};

// Gets a user (also modified not to return too much information)
export const getUser = (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      const out = {
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
      };

      res.send(out);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// Deletes an entire user
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

// Update user parameters (just use this for username, email, simple fields (NOT skills)
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

// THE FOLLOWING FUNCTIONS DEAL WITH HANDLING SKILLS

// Add a skill for a user to learn
export const addSkill = (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      result.learn.push({
        title: req.body.title,
        years: req.body.years,
        description: req.body.description,
      });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// Add a skill that a user can teach
export const addTeach = (req, res) => {
  // Only push to that user's teach library
  User.findById(req.params.id)
    .then((result) => {
      result.teach.push({
        title: req.body.title,
        years: req.body.years,
        description: req.body.description,
      });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });


  Skill.findOne({ title: req.body.title })
    .then((result) => {
      if (result !== null) {
        res.json('Skill exists'); // If the email is null

        result.users.insert(req.body.email);
      } else {
        const skill = new Skill();

        skill.title = req.body.title;
        skill.users = [req.body._id];

        skill.save()
          .then(() => {
            // res.json({ message: 'good' }); // send the token for the new user
            res.json({ message: 'Skill saved' }); // send the token for the new user
          })
          .catch((error) => {
            res.status(500).json({ error });
          });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// Delete a skill a user wants to learn
export const delSkill = (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      result.learn.forEach((element, index, object) => {
        if (element.title === req.params.title) {
          object.splice(index, 1);
        }
      });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// Delete a skill a user wants to teach
export const delTeach = (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      result.teach.forEach((element, index, object) => {
        if (element.title === req.params.title) {
          object.splice(index, 1);
        }
      });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });

  Skill.findById(req.params.id)
    .then((result) => {
      result.users.forEach((user, index, object) => {
        if (user === req.params.id) {
          object.splice(index, 1);
        }
      });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// Update a skill for a user
export const updateSkill = (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      result.learn.forEach((element) => {
        if (element.title === req.params.title) {
          element.description = req.params.description;
        }
      });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// Update a skill that a user wants to teach
export const updateTeach = (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      result.teach.forEach((element) => {
        if (element.title === req.params.title) {
          element.description = req.params.description;
        }
      });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// Get information on a specific skill (the users associated with it)
export const getSkill = (req, res) => {
  Skill.findById(req.params.id)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// Get information on all skills (and all users associated with them)
export const getSkills = (req, res) => {
  Skill.find({}).then((result) => {
    res.send(result);
  }).catch((error) => {
    res.status(500).json({ error });
  });
};
