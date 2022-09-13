import createServer from './utils/createServer';

const main = async () => {
  const app = createServer();
  try {
    const url = await app.listen({ port: 4000, host: '0.0.0.0' });
    app.log.info(`Server is ready at ${url}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

main();
