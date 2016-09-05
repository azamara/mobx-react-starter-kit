import express from 'express';
import middlewares from './middlewares';
import routes from './routes';

const GRAPHQL_PORT = 8000;

const app = express();
app.disable('x-powered-by');
middlewares(app)
routes(app)

app.listen(GRAPHQL_PORT, () => console.log(
  `BFF Server is now running on http://localhost:${GRAPHQL_PORT}`
));
