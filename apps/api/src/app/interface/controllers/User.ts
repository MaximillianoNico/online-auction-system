import mongoose from 'mongoose';
import User from '../../infrastructure/repository/mongo/User';

const Get = async (req, res) => {
  const userId = req?.user?.user_id || "";
  const userDetail = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(userId)
      }
    },
    {
      $lookup: {
        from: "tbl_transactions",
        localField: "_id",
        foreignField: "userId",
        as: "transactions"
      }
    }
  ]).exec()

  const data = {
    uptime: process.uptime(),
    message: 'Success Get Profile',
    data: userDetail,
    date: new Date()
  };

  res.status(200).send(data);
}

const Update = (req, res) => {
  const data = {
    uptime: process.uptime(),
    message: 'Updated!',
    date: new Date()
  };

  res.status(200).send(data);
}

export default { Get, Update }
