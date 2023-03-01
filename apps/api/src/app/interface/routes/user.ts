import express from 'express';
import User from '../controllers/User'

const router = express.Router();
const UserController = (ctx: any) => {
  router.get('/', User.Get);
  router.put('/update', User.Update);

  return router;
}

export default UserController;
