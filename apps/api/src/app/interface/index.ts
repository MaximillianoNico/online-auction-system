import AuthMiddleware from '../infrastructure/middleware/auth'

import healthCheck from './routes/healthcheck';
import auth from './routes/auth';
import products from './routes/products';
import user from './routes/user';
import transactions from './routes/transactions';

import { IMainRoute, IRequest } from './types'

const Interface = ({ app, client }: IMainRoute) => {

  // Define Routes
  app.use((req: IRequest, res, next) => {
    req.client = client;

    next();
  })
  app.use('/app', healthCheck({ app }));
  app.use('/auth', auth({ app }));
  app.use('/products', AuthMiddleware, products({ app }));
  app.use('/user', AuthMiddleware, user({ app }));
  app.use('/transaction', AuthMiddleware, transactions({ app, client }));

  /**
   * Catch 404 and forward to error handle.
   */
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });

  /**
   * Global error catcher.
   */
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        errors:{
            message: err.message
        }
    });
  });
}

export default Interface;
