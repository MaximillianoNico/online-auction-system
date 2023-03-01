import express from 'express';
import Auth from '../controllers/Auth'

const router = express.Router();
const AuthController = (ctx: any) => {
  router.post('/sign-in', Auth.UserLogin);
  router.post('/sign-out', Auth.UserLogout);
  router.post('/register', Auth.UserRegister);

  return router;
}

export default AuthController;
