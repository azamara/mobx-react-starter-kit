import bunyan from 'bunyan';

const logger = bunyan.createLogger({
  name: 'bff'
});

export default logger;
