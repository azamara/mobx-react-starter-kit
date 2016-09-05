import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import bunyanMiddleware from 'bunyan-middleware';
import graphql from './graphql';
import config from '../../config';
import logger from './logger';
import cors from 'cors';

export default (app) => {
  app.use(cors());
  app.use(cookieParser()); // read cookies (needed for auth)
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use(bunyanMiddleware({
    logger: logger,
    headerName: 'X-Request-Id'
  }));
  app.use('/graphql', graphql);
  app.use(session({
    genid: function(req) {
      return genuuid() // use UUIDs for session IDs
    },
    secret: config.get("sessionSecretKey"),
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: false
  }));
}

function genuuid(req) {
  return "Test UID";
}
