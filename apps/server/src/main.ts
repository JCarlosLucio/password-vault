import createServer from './utils/createServer';
import logger from './utils/logger';

const main = async () => {
  const app = createServer();
  try {
    const url = await app.listen({ port: 4000, host: '0.0.0.0' });
    logger.info(`Server is ready at ${url}`);
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
};

main();
