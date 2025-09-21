import { type FastifyInstance } from 'fastify';

import { PORT } from './constants';
import createServer from './utils/createServer';
import { connectToDb, disconnectFromDb } from './utils/db';
import logger from './utils/logger';

const gracefulShutdown = (signal: string, app: FastifyInstance) => {
  process.on(signal, async () => {
    await app.close();
    await disconnectFromDb();
    logger.info(`Goodbye, got signal ${signal}`);
    process.exit(0);
  });
};

const main = async () => {
  const app = createServer();

  try {
    const url = await app.listen({ port: PORT, host: '0.0.0.0' });
    await connectToDb();
    logger.info(`Server is ready at ${url}`);
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }

  const signals = ['SIGTERM', 'SIGINT'];

  for (const signal of signals) {
    gracefulShutdown(signal, app);
  }
};

void main();
