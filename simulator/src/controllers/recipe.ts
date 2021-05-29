import { FastifyInstance } from 'fastify';

async function controller(server: FastifyInstance): Promise<void> {
  server.get('/recipes', async (request) => {
    return await request.diScope.cradle
      .db('recipes')
      .select('recipes.*', 'items.name')
      .innerJoin('items', 'recipes.result', 'items.id')
      .where('items.name', 'like', '미스릴 %');
  });
}

export default controller;
