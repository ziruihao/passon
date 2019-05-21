/* eslint-disable prefer-destructuring */
import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import User from '../models/user_model';
import Skill from '../models/skill_model';
import Rating from '../models/rating_model';


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
      res.send({
        user: result,
        token: tokenForUser(req.user),
      });
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

// Signs up a user and generates a token for them
export const signup = (req, res, next) => {
  // console.log(`REQ BODY: ${req.body.firstName}`);
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

        user.save().then((result2) => {
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
      res.status(404).json({ msg: error.message });
    });

  return next;
};

// Gets all users (modified so that it does not return any password information; add other fields to return as needed
export const getUsers = (req, res) => { // TODO: return based on searched skill
  User.find({}).populate('teach').populate('learn').then((results) => {
    console.log(results);
    res.send(results);
  })
    .catch((error) => {
      res.status(404).json({ msg: error.message });
    });
};

// Gets a user (also modified not to return too much information)
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

export const getSelf = (req, res) => {
  console.log(`in get self: req.user is ${req.user}`);
  User.find({ email: req.user })
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.log(`get self failed: ${error}`);
    });
};


// Deletes an entire user
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

/**
 * Adds a skill to the [User]'s list of things they want to learn, a.k.a [User.learn].
 * @param {*} req
 * @param {*} res
 */
export const addLearn = (req, res) => {
  User.findById(req.user.id).populate('teach').populate('learn')
    .then((result) => {
      const skill = new Skill();
      skill.title = req.body.skill.title;
      skill.save().then((result2) => {
        console.log(result2);
        result.learn.push(result2);
        console.log(result);
        result.save().then((response) => {
          console.log(response);
          res.json(response);
        }).catch((error) => {
          res.status(500).json({ msg: error.message });
        });
      });
    })
    .catch((error) => {
      res.status(500).json({ msg: error.message });
    });
};

/**
 * Adds a skill to the [User]'s list of things they want to teach, a.k.a. [User.teach].
 * @param {*} req
 * @param {*} res
 */
export const addTeach = (req, res) => {
  User.findById(req.user.id).populate('teach').populate('learn')
    .then((result) => {
      const skill = new Skill();
      skill.title = req.body.skill.title;
      skill.years = req.body.skill.years;
      skill.bio = req.body.skill.bio;
      skill.ratings = req.body.skill.ratings;

      skill.save().then((result2) => {
        result.teach.push(result2);
        result.save().then((response) => {
          res.json(response);
        }).catch((error) => {
          res.status(500).json({ error });
        });
      });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// Delete a skill a user wants to learn
export const deleteLearn = (req, res) => {
  User.findById(req.params.id).populate('learn')
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
export const deleteTeach = (req, res) => {
  User.findById(req.params.id).populate('teach')
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
};

// Update a skill for a user
export const updateLearn = (req, res) => {
  User.findById(req.params.id).populate('learn')
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
  User.findById(req.params.id).populate('teach')
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

export const getLearns = () => {

};

export const getTeaches = () => {

};

// Get information on a specific skill (the users associated with it)
export const getSkill = (req, res) => {
  User.find({}).populate('teach')
    .then((results) => {
      console.log(results);
      console.log(req.params.title);
      // results.filter((result) => { return (result.teach.filter((skill) => { return (skill.title === req.body.title); }).length === 0); });
      res.send(results);
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


// testing
export const addSkillRating = (req, res) => {
  Skill.findById(req.params.id).then((result) => {
    const rating = new Rating();
    rating.score = 5;
    result.ratings.push(rating);
    res.send(result);
  }).catch((error) => {
    res.send({ msg: error.message });
  });
};
