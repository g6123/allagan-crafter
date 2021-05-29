import {
  BasicSynthesis,
  CrafterStats,
  CraftingJob,
  Simulation,
} from '@ffxiv-teamcraft/simulator';
import { FastifyInstance } from 'fastify';

async function controller(server: FastifyInstance): Promise<void> {
  server.get('/simulation', async () => {
    const simulation = new Simulation(
      {
        id: '1',
        job: 14,
        rlvl: 123,
        durability: 80,
        quality: 20287,
        progress: 3943,
        lvl: 80,
        suggestedCraftsmanship: 0,
        suggestedControl: 0,
        hq: 1,
        quickSynth: 1,
        ingredients: [],
        conditionsFlag: 15,
      },
      [new BasicSynthesis()],
      new CrafterStats(
        CraftingJob.ALC,
        100,
        100,
        100,
        true,
        80,
        [80, 80, 80, 80, 80, 80, 80, 80],
      ),
    );

    return {
      result: simulation.run(),
      reliabilityReport: simulation.getReliabilityReport(),
    };
  });
}

export default controller;
