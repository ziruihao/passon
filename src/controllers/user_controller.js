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
export const getUsers = (req, res) => { // TODO: return based on searched skill; make it so this does not return all ifno
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
  User.findById(req.params.id).populate('teach').populate('learn')
    .then((result) => {
      const removePersonalInfo = Object.assign({}, result);

      console.log(removePersonalInfo._doc);

      delete removePersonalInfo._doc.password;
      delete removePersonalInfo._doc.email;

      res.json(removePersonalInfo._doc);
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

export const getSelf = (req, res) => {
  console.log(`in get self: req.user is ${req.user}`);
  res.send(req.user);
  // User.find({ email: req.user })
  //   .then((result) => {
  //     res.send(result);
  //   })
  //   .catch((error) => {
  //     console.log(`get self failed: ${error}`);
  //   });
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
 *
 * Need to supply title and desc
 */
export const addLearn = (req, res) => {
  User.findById(req.user.id).populate('teach').populate('learn')
    .then((result) => {
      const skill = new Skill();
      skill.title = req.body.skill.title;
      skill.bio = req.body.skill.bio;
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
  User.findById(req.user.id).populate('teach').populate('learn')
    .then((result) => {
      result.learn.forEach((element, index, object) => {
        if (element.title === req.body.skill.title) {
          object.splice(index, 1);
        }
      });
      result.save().then((response) => {
        res.json(response);
      }).catch((error) => {
        res.status(500).json({ msg: error.message });
      });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
};

// Delete a skill a user wants to teach
export const deleteTeach = (req, res) => {
  User.findById(req.user.id).populate('teach').populate('learn')
    .then((result) => {
      result.teach.forEach((element, index, object) => {
        if (element.title === req.body.skill.title) {
          object.splice(index, 1);
        }
      });
      result.save().then((response) => {
        res.json(response);
      }).catch((error) => {
        res.status(500).json({ msg: error.message });
      });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
};

/**
 * Update a skill that a user wants to teach
 * - Supply title and bio for the skill
 */
export const updateLearn = (req, res) => {
  User.findById(req.user.id).populate('teach').populate('learn')
    .then((result) => {
      result.learn.forEach((element) => {
        if (element.title === req.body.skill.title) {
          element.bio = req.body.skill.bio;
          element.save().then(() => {
            result.save().then((response) => {
              res.json(response);
            }).catch((error) => {
              res.status(500).json({ msg: error.message });
            });
          });
        }
      });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

/**
 * Update a skill that a user wants to teach
 * - Supply title, bio, and years of updated skill
 */
export const updateTeach = (req, res) => {
  User.findById(req.user.id).populate('teach').populate('learn')
    .then((result) => {
      result.teach.forEach((element) => {
        if (element.title === req.body.skill.title) {
          element.bio = req.body.skill.bio;
          element.save().then(() => {
            result.save().then((response) => {
              res.json(response);
            }).catch((error) => {
              res.status(500).json({ msg: error.message });
            });
          });
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
  User.find({}).populate('teach').populate('learn')
    .then((results) => {
      const out = [];
      results.forEach((user) => {
        // console.log('-------------------');
        // console.log(user.teach.filter(skill => skill.title === req.params.title));
        user.teach.forEach((skill) => {
          if (skill.title.toUpperCase() === req.params.title.toUpperCase()) {
            out.push(user);
          }
        });
      });
      res.send(out);
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
