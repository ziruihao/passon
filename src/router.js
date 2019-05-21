import { Router } from 'express';
import * as User from './controllers/user_controller';
import { requireAuth, requireSignin } from './services/passport';

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
  .get(requireAuth, User.getUser)
  .delete(requireAuth, User.deleteUser);

router.route('users/:id/learn')
  .post(requireAuth, User.addLearn)
  .post(requireAuth, User.updateLearn)
  .delete(requireAuth, User.deleteLearn)
  .get(User.getLearns);

router.route('users/:id/teach')
  .post(requireAuth, User.addTeach)
  .post(requireAuth, User.updateTeach)
  .delete(requireAuth, User.deleteTeach)
  .get(User.getTeaches);

router.route('/users')
  .get(User.getUsers);


/**
 * SKILL ROUTES
 */

router.route('skills')
  .get(User.getSkills);

router.route('/skills/:title')
  .get(User.getSkill);

router.route('/test/:id')
  .post(User.addSkillRating);

export default router;
