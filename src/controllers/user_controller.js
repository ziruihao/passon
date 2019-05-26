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
  User.findOne({ email: req.body.email }).populate('learn').populate('teach')
    .then((user) => {
      res.send({
        user,
        token: tokenForUser(req.user),
      });
    })
    .catch((error) => {
      res.status(404).json({ message: error.message });
    });
};

// Signs up a user and generates a token for them
export const signup = (req, res, next) => {
  const { firstName } = req.body;
  const { lastName } = req.body;
  const { email } = req.body;
  const { password } = req.body;
  const { university } = req.body;

  if (!firstName || !lastName || !email || !password || !university) {
    return res.status(422).send('You must provide name, email, password, and university.');
  } // also this error-checking can be done in the frontend so we're not sending this to the server

  User.findOne({ email: req.body.email })
    .then((existingUser) => {
      if (existingUser !== null) {
        res.json('User already exists');
      } else {
        const user = new User();

        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.password = req.body.password;
        user.university = req.body.university;

        user.save().then((savedUser) => {
          res.json({
            user: savedUser,
            token: tokenForUser(savedUser),
          });
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

/**
 * Returns all protected users data.
 * @param {*} req
 * @param {*} res
 */
export const getUsers = (req, res) => { // why do we need both req and res? why is the async working?
  User.find({}).populate('teach').populate('learn').then((results) => {
    const removePersonalInfoArray = [];
    results.forEach((result) => {
      const removePersonalInfo = Object.assign({}, result);
      delete removePersonalInfo._doc.password;
      // delete removePersonalInfo._doc.email;
      removePersonalInfoArray.push(removePersonalInfo._doc);
    });
    res.send(results);
  })
    .catch((error) => {
      res.status(404).json({ msg: error.message });
    });
};

/**
 * Returns a specific user's protected data.
 * @param {*} req
 * @param {*} res
 */
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

/**
 * Returns private information about a user, this route is protected.
 * @param {*} req
 * @param {*} res
 */
export const getSelf = (req, res) => {
  User.findById(req.user.id).populate('learn').populate('teach')
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      res.status(404).json({ message: error.message });
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
      let alreadyHas = false;
      result.learn.forEach((skill) => {
        if (skill.title.toUpperCase() === req.body.skill.title.toUpperCase()) alreadyHas = true;
      });
      if (!alreadyHas) {
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
      } else res.send('Skill already exists');
    })
    .catch((error) => {
      res.status(404).json({ msg: error.message });
    });
};

/**
 * Adds a skill to the [User]'s list of things they want to teach, a.k.a. [User.teach].
 * @param {*} req
 * @param {*} res
 */
export const addTeach = (req, res) => {
  console.log('REQ BODY ====');
  console.log(req.body);
  User.findById(req.user.id).populate('teach').populate('learn')
    .then((result) => {
      const alreadyHas = false;
      // result.teach.forEach((skill) => {
      //   if (skill.title.toUpperCase() === req.body.title.toUpperCase()) alreadyHas = true;
      // });
      if (!alreadyHas) {
        const skill = new Skill();
        skill.title = req.body.skill.title;
        skill.years = req.body.skill.years;
        skill.bio = req.body.skill.bio;
        skill.ratings = req.body.skill.ratings;
        skill.save().then((saved) => {
          result.teach.push(saved);
          result.save().then((response) => {
            res.json(response);
          }).catch((error) => {
            res.status(500).json({ error });
          });
        });
      } else res.send('Skill already exists');
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

// Delete a skill a user wants to learn
export const deleteLearn = (req, res) => {
  User.findById(req.user.id).populate('teach').populate('learn')
    .then((result) => {
      if (result.learn.length !== 0) {
        result.learn.forEach((element, index, object) => {
          if (element.id === req.body.id) {
            object.splice(index, 1);
            result.save().then((response) => {
              res.json(response);
            }).catch((error) => {
              res.status(500).json({ msg: error.message });
            });
          }
        });
      } else res.send('User doesnt even have any skills dude.');
    })
    .catch((error) => {
      res.status(404).json({ message: error.message });
    });
};

// Delete a skill a user wants to teach
export const deleteTeach = (req, res) => {
  User.findById(req.user.id).populate('teach').populate('learn')
    .then((result) => {
      if (result.teach.length !== 0) {
        result.teach.forEach((element, index, object) => {
          if (element.id === req.body.id) {
            object.splice(index, 1);
            result.save().then((response) => {
              res.json(response);
            }).catch((error) => {
              res.status(500).json({ msg: error.message });
            });
          }
        });
      } else res.send('User doesnt even have any skills dude.');
    })
    .catch((error) => {
      res.status(404).json({ message: error.message });
    });
};

/**
 * Update a skill that a user wants to learn, only updates the [bio] property.
 * - Supply the skill with its [id]
 */
export const updateLearn = (req, res) => {
  User.findById(req.user.id).populate('teach').populate('learn')
    .then((result) => {
      if (result.learn.length !== 0) {
        result.learn.forEach((element) => {
          if (element.id === req.body.skill.id) {
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
      } else res.send('User doesnt even have any skills dude.');
    })
    .catch((error) => {
      res.status(404).json({ message: error.message });
    });
};

/**
 * Update a skill that a user wants to teach, only updates the [bio] and [years] properties.
 * - Supply the skill with its [id]
 */
export const updateTeach = (req, res) => {
  User.findById(req.user.id).populate('teach').populate('learn')
    .then((result) => {
      if (result.teach.length !== 0) {
        result.teach.forEach((element) => {
          if (element.id === req.body.skill.id) {
            element.bio = req.body.skill.bio;
            element.years = req.body.skill.years;
            element.save().then(() => {
              result.save().then((response) => {
                res.json(response);
              }).catch((error) => {
                res.status(500).json({ msg: error.message });
              });
            });
          }
        });
      } else res.send('User doesnt have any skills dude');
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

/**
 * Returns the set of [User]s that [teach] a certain [Skill].
 * @param {*} req
 * @param {*} res
 */
export const getTeachers = (req, res) => {
  const upperCased = req.body.skills.map(skill => skill.toUpperCase());
  User.find({}).populate('teach').populate('learn')
    .then((results) => {
      const out = [];
      results.forEach((user) => {
        // console.log('-------------------');
        // console.log(user.teach.filter(skill => skill.title === req.params.title));
        user.teach.forEach((skill) => {
          if (upperCased.includes(skill.title.toUpperCase()) && !out.includes(user)) {
            out.push(user);
          }
        });
      });
      res.send(out);
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};


// testing: do not remove yet
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
