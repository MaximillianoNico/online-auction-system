import express from 'express';
import Product from '../controllers/Product'

const router = express.Router();
const ProductController = (ctx: any) => {
  router.get('/detail/:id', Product.Get);
  router.get('/', Product.GetList);
  router.post('/create', Product.Create);
  router.put('/publish/:id', Product.Publish);
  router.put('/update/:id', Product.Update);

  return router;
}

export default ProductController;
