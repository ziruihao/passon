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

// USER ROUTERS

router.route('/users/:id')
  .post(requireAuth, User.updateUser) // TODO: make this require auth like others later
  .get(requireAuth, User.getUser)
  .delete(requireAuth, User.deleteUser);

router.route('users/:id/skills')
  .post(requireAuth, User.addSkill)
  .get(User.getSkills);

router.route('/users')
  .post(User.createUser)
  .get(User.getUsers);

// SKILL (TO LEARN) ROUTERS

router.route('/skills/:id/delete')
  .post(requireAuth, User.delSkill);

router.route('/skills/:id')
  .post(requireAuth, User.updateSkill)
  .get(User.getSkill);

router.route('/skills')
  .get(User.getSkills);

router.route('/addSkill')
  .post(requireAuth, User.addSkill);

// SKILL (TO TEACH) ROUTERS

router.route('/teach/:id/delete')
  .post(requireAuth, User.delTeach);

router.route('/teach/:id')
  .post(requireAuth, User.updateTeach);

router.route('/addTeach')
  .post(requireAuth, User.addTeach);

export default router;
