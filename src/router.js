import { Router } from 'express';
import * as User from './controllers/user_controller';
import { requireAuth, requireSignin } from './services/passport';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to passOn!' });
});

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

router.post('/signin', requireSignin, User.signin);
router.post('/signup', User.signup);

export default router;
