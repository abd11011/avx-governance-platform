require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const cors = require('@fastify/cors');

async function buildServer() {
  // Enable CORS
  await fastify.register(cors, { origin: true });

  // Health check route
  fastify.get('/health', async (request, reply) => {
    return { status: 'ok', service: 'AVX Governance Backend' };
  });

  return fastify;
}

buildServer()
  .then((app) => {
    const port = process.env.PORT || 4000;
    app.listen({ port, host: '0.0.0.0' }, (err, address) => {
      if (err) {
        app.log.error(err);
        process.exit(1);
      }
      app.log.info(`Server running at ${address}`);
    });
  })
  .catch((err) => {
    console.error('Error starting server:', err);
    process.exit(1);
  });
