import jwt from 'jwt-simple';
import config from '../../config';

export default (app) => {
  app.get('/', (req, res, next) => {
    res.json({ok:true})
  });

  app.post('/register', (req, res, next) => {
    // TODO
  })

  app.post('/auth', (req, res, next) => {
    // TODO
  });
}
