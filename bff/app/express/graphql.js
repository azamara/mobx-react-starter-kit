import { apolloServer } from 'graphql-tools';
import { parseSession } from './auth';
import config from '../../config';
import Schema from '../graphql/schema';
import Mocks from '../graphql/mocks';

export default apolloServer((req) => {
  const session = parseSession(req.headers.authorization);
  const isAuthenticated = (typeof session === "object");

  return {
    graphiql: config.get("graphiql"),
    pretty: true,
    schema: Schema,
    mocks: Mocks,
    allowUndefinedInResolve: false,
    printErrors: true,
    context: {
      log: req.log,
      isAuthenticated,
      session
    }
  }



})
