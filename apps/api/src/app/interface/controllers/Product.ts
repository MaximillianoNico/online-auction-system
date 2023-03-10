import moment from 'moment'
import mongoose from 'mongoose';
import Product from '../../infrastructure/repository/mongo/Product'

const Create = async (req, res) => {
  const payload = req?.body || {}

  if (!req?.user?.user_id) return res.status(403).send({
    uptime: process.uptime(),
      errors: 'Forbidden',
      date: new Date()
  });

  const NewProduct = new Product({
    ...payload,
    owner: req?.user?.user_id,
    isActive: false
  });

  await NewProduct.save((err, results) => {
    if (err) {
      return res.status(400).send({
        errors: err,
        date: new Date()
      })
    }

    const data = {
      uptime: process.uptime(),
      message: 'Created!',
      data: results,
      date: new Date()
    };

    return res.status(200).send(data);
  });
}

const Get = async (req, res) => {
  const productId = req?.params?.id || "";
  const userId = req?.user?.user_id || "";

  const doc = await Product.find({ _id: productId }).where('owner').ne(userId).exec();

  const data = {
    uptime: process.uptime(),
    message: 'Get!',
    data: doc,
    date: new Date()
  };

  res.status(200).send(data);
}

const GetList = async (req, res) => {
  const isPublished = req?.query?.published === 'true'
  const isAchieve = req?.query?.achieve === 'true'

  const queries = {
    owner: {
      $ne: new mongoose.Types.ObjectId(req?.user?.user_id)
    },
    ...(isPublished ? { isActive: true } : {}),
    ...(isAchieve ? { lastTimeAuction: { $lt: Date.now() } } : {})
  };

  const doc = await Product.find(queries).exec();

  const data = {
    uptime: process.uptime(),
    message: 'Get!',
    data: doc,
    date: new Date()
  };

  res.status(200).send(data);
}

const Update = async (req, res) => {
  const payload = req?.body || {}
  const productId = req?.params?.id || ""

  if (!req?.user?.user_id) return res.status(403).send({
    uptime: process.uptime(),
      errors: 'Forbidden',
      date: new Date()
  });

  const doc = await Product.findOneAndUpdate(
    { owner: req?.user?.user_id, id: productId },
    payload,
    { new: true }
  );

  const data = {
    uptime: process.uptime(),
    message: 'Updated!',
    data: doc,
    date: new Date()
  };

  res.status(200).send(data);
}

const Publish = async (req, res) => {
  const productId = req?.params?.id || ""
  if (!productId) return res.status(403).send({
    uptime: process.uptime(),
    errors: 'product id is required',
    date: new Date()
  });

  const doc = await Product.findOneAndUpdate(
    { _id: productId, owner: req?.user?.user_id },
    { isActive: true, startAuction: Date.now(), lastTimeAuction: moment().add(3, 'days') },
    { new: true }
  ).exec()

  const data = {
    uptime: process.uptime(),
    message: 'Published!',
    data: doc,
    date: new Date()
  };

  res.status(200).send(data);
}

export default { Create, Update, Get, Publish, GetList }
