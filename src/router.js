import { Router } from 'express';
import * as User from './controllers/user_controller';
import { requireAuth, requireSignin } from './services/passport';
import * as Messaging from './controllers/message_controller';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to passOn!' });
});

// SIGN IN / OUT ROUTES

router.post('/signin', requireSignin, User.signin);
router.post('/signup', User.signup);

/**
 * USER ROUTES
 */

router.route('/users/:id')
  .post(requireAuth, User.updateUser) // TODO: make this require auth like others later
  .get(User.getUser)
  .delete(requireAuth, User.deleteUser);

router.route('/learn')
  .post(requireAuth, User.addLearn)
  .put(requireAuth, User.updateLearn)
  .delete(requireAuth, User.deleteLearn);

router.route('/teach')
  .post(requireAuth, User.addTeach)
  .put(requireAuth, User.updateTeach)
  .delete(requireAuth, User.deleteTeach);

router.route('/users')
  .get(User.getUsers);

router.route('/self')
  .post(requireAuth, User.getSelf);

router.route('/addRating')
  .post(requireAuth, User.addSkillRating);


/**
 * MESSAGING ROUTES
 */

router.route('/messaging') // id is userID
  .post(requireAuth, Messaging.createChat)
  .get(requireAuth, Messaging.getChats);


router.route('/messaging/:id') // id is userID
  .get(requireAuth, Messaging.getChat);

/**
 * SKILL ROUTES
 */

router.route('/teachers')
  .post(User.getTeachers);

router.route('/learners')
  .post(User.getLearners);

router.route('/test/:id')
  .post(User.addSkillRating);

router.route('/skills')
  .get(User.getSkills);

export default router;
