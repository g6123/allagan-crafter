import { asFunction, Lifetime } from 'awilix';
import { FastifyInstance } from 'fastify';
import { Cradle } from 'fastify-awilix';
import createKnex from 'knex';

function getDatabase({ logger }: Cradle) {
  const dbLogger = logger.child({ component: 'database' });

  return createKnex({
    client: 'sqlite',
    connection: {
      filename: './asset/db.sqlite',
    },
    useNullAsDefault: true,
    debug: true,
    log: {
      error: (message) => dbLogger.error(message),
      warn: (message) => dbLogger.warn(message),
      deprecate: (method, alternative) =>
        dbLogger.warn(`${method} is deprecated, please use ${alternative}`),
      debug: (message) => dbLogger.trace(message, 'database query'),
    },
  });
}

export default async function (server: FastifyInstance): Promise<void> {
  server.diContainer.register({
    db: asFunction(getDatabase, {
      lifetime: Lifetime.SINGLETON,
    }),
  });
}
