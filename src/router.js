import { Router } from 'express';
import * as User from './controllers/user_controller';
import * as UserController from './controllers/user_controller';
import { requireAuth, requireSignin } from './services/passport';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to passOn!' });
});

// /your routes will go here

router.route('/skills/:id')
  .post(requireAuth, User.getUsers)
  .get(User.getUsers);

  router.route('/skills')
  .post(requireAuth, User.getUsers)
  .get(User.getUsers);

  router.route('/users/:id')
  .post(requireAuth, User.getUsers)
  .get(User.getUsers);

  router.route('/users')
  .get(User.getUsers);

// router.route('/posts/:id')
//   .get(Posts.getPost)
//   .put(requireAuth, Posts.updatePost)
//   .delete(requireAuth, Posts.deletePost);

router.post('/signin', requireSignin, UserController.signin);
router.post('/signup', UserController.signup);

export default router;
