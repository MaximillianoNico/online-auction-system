import moment from 'moment'
import Product from '../../infrastructure/repository/mongo/Product'
import Transactions from '../../infrastructure/repository/mongo/Transactions'
import User from '../../infrastructure/repository/mongo/User'

const List = async (req, res) => {
  const userId = req?.user?.user_id || ""

  const transactions = await Transactions.find({ userId }).exec();
  const data = {
    uptime: process.uptime(),
    message: 'Success',
    data: transactions,
    date: new Date()
  };

  return res.status(200).send(data);
}

const Deposit = async (req, res) => {
  const userId = req?.user?.user_id || "";
  const deposit = req?.body?.deposit || 0;

  if (!+deposit) {
    const data = {
      uptime: process.uptime(),
      errors: 'deposit should be more than 0',
      date: new Date()
    };

    return res.status(400).send(data);
  }

  const userDetail = await User.findOne({ _id: userId }).exec();
  const currentDeposit = userDetail?.deposit || 0;

  const updated = await User.findOneAndUpdate(
    { _id: userId },
    { deposit: +currentDeposit + +deposit },
    { new: true }
  ).exec();

  const data = {
    uptime: process.uptime(),
    message: 'Success',
    data: updated,
    date: new Date()
  };

  return res.status(200).send(data);
}

const Bid = async (req, res) => {
  const userId = req?.user?.user_id || ""
  const productId = req?.params?.productId || "";
  const bid = req?.body?.bid || 0;

  if (!productId) return res.status(400).send({
    uptime: process.uptime(),
    errors: 'Product ID is required',
    date: new Date()
  });

  const productDetail = await Product.findOne({ _id: productId }).exec();

  /**
   * Validation
   */

  // Check Product Published
  if (!productDetail?.isActive)return res.status(400).send({
    uptime: process.uptime(),
    errors: "Product not published yet!",
    date: new Date()
  });

  // Check Product owner
  if (productDetail?.owner === userId) return res.status(400).send({
    uptime: process.uptime(),
    errors: "can't bid your own product",
    date: new Date()
  });

  // Validate product price and bid price
  if (bid <= +productDetail?.price) return res.status(400).send({
    uptime: process.uptime(),
    errors: 'bid price should be upper than price',
    date: new Date()
  });

  // Validate bid price should be upper than latest bid price
  if (bid <= +productDetail?.latestBid?.bidPrice) return res.status(400).send({
    uptime: process.uptime(),
    errors: 'bid price should be upper than latest bid: ' + productDetail?.latestBid?.bidPrice,
    date: new Date()
  });

  // Protect bid time based on lastTimeAuction
  const productLastBidTime = moment(productDetail?.lastTimeAuction).toISOString();
  const currentDate = moment()
  if (currentDate.isAfter(productLastBidTime)) {
      return res.status(400).send({
        uptime: process.uptime(),
        errors: "Can't bid this product due it's past auction time",
        date: new Date()
      });
  }

  const NewTransaction = new Transactions({ productId, userId, bid });

  await NewTransaction.save(async (_err, result) => {
    if (result) {
      if (_err) {
        // TODO:
      }

      const updateLatestBidTransaction = await Product.findOneAndUpdate(
        { _id: productId },
        { latestBid: { bidBy: userId, bidPrice: bid }},
        { new: true }
      ).exec();

      const productUpdated = await Product.find({});

      // Update list of product
      await req?.client?.emit('products', productUpdated)

      // Send latest bid product
      await req?.client?.emit(`product-bid::${productId}`, {
        product: updateLatestBidTransaction?.latestBid
      })

      if (updateLatestBidTransaction) {
        // TODO: need to socket.emit into `bid::{{productId}}` with send bid price
      }
    }
  });

  const data = {
    uptime: process.uptime(),
    message: 'Bid Success!',
    data: {},
    date: new Date()
  };

  res.status(200).send(data);
}


export default { Bid, List, Deposit }
