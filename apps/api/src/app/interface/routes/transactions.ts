import express from 'express';
import Transaction from '../controllers/Transaction'

import { IMainRoute } from '../types';

const router = express.Router();
const TransactionController = (ctx: IMainRoute) => {
  router.get('/', Transaction.List);
  router.post('/deposit', Transaction.Deposit);
  router.post('/:productId', Transaction.Bid);

  return router;
}

export default TransactionController;
