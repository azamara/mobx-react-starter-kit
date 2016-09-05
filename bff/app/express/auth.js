import jwt from 'jwt-simple';
import config from '../../config';
import logger from './logger';

export function parseSession(authorization) {
  try {
    if (authorization === undefined) return null;
    const tokenSecret = config.get("jwtSecretKey");
    const token = authorization.replace("Bearer ", "");
    return jwt.decode(token, tokenSecret);
  } catch(ex) {
    logger.error(ex);
    return null;
  }
}
