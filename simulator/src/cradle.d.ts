import Bunyan from 'bunyan';
import { Knex } from 'knex';

declare module 'fastify-awilix' {
  interface Cradle {
    profile: string;
    logger: Bunyan;
    db: Knex;
  }

  interface RequestCradle {}
}
