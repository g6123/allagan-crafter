import path from 'path';
import { asValue } from 'awilix';
import { createLogger } from 'bunyan';
import { fastify } from 'fastify';
import autoload from 'fastify-autoload';
import { fastifyAwilixPlugin as awilix, diContainer } from 'fastify-awilix';

const profile = process.env.PROFILE ?? 'dev';

const logger = createLogger({
  name: '@allagan/simulator',
  level: 'debug',
});

const server = fastify({
  logger,
});

server.register(awilix);
diContainer.register({
  profile: asValue(profile),
  logger: asValue(logger),
});

server.register(autoload, { dir: path.join(__dirname, 'infra') });
server.register(autoload, { dir: path.join(__dirname, 'controllers') });

server.listen(8080, (error) => {
  if (error != null) {
    throw error;
  }
});
