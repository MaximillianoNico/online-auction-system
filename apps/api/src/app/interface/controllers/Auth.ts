import jwt from 'jsonwebtoken';
import User from '../../infrastructure/repository/mongo/User'
import { hash, compare } from '@online-auction-system/auth-utils';

const UserLogin = async (req, res) => {
  const email = req?.body?.email || ""
  const password = req?.body?.password || ""

  const userData = await User.findOne({ email }).exec();
  const isValid = compare(password, userData?.salt, userData?.password)

  if (!isValid) return res.status(403).send({
    uptime: process.uptime(),
    errors: 'Email or Password is not match',
    date: new Date()
  })

  const token = jwt.sign(
    { user_id: userData?._id, email },
    process.env?.JWT_TOKEN
  )

  const data = {
    uptime: process.uptime(),
    message: 'Login Success',
    data: { token },
    date: new Date()
  };

  res.status(200).send(data);
}

const UserLogout = (req, res) => {
  const data = {
    uptime: process.uptime(),
    message: 'Logout Success',
    date: new Date()
  };

  res.status(200).send(data);
}

const UserRegister = async (req, res) => {
  const { hash: result, salt } = hash(req?.body?.password)
  const payload = {
    ...req?.body,
    password: result,
    salt
  }
  const userData = await User.findOne({ email: req?.body?.email }).exec();

  if (userData?._id) return res.status(400).send({
    uptime: process.uptime(),
    errors: 'Email already registered',
    date: new Date()
  })

  const NewUser = new User(payload)

  await NewUser.save();

  const data = {
    uptime: process.uptime(),
    message: 'Success Register',
    date: new Date()
  };

  res.status(200).send(data);
}

export default { UserLogin, UserLogout, UserRegister }
