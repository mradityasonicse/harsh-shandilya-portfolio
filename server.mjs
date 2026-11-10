import { createServer } from 'vite';

async function start() {
  const server = await createServer({
    configFile: './vite.config.ts',
    server: {
      port: 3000,
      host: true,
    },
  });

  await server.listen();
  server.printUrls();

  // Keep process alive indefinitely
  setInterval(() => {}, 1000 * 60 * 60);
}

start().catch((err) => {
  console.error('Failed to start Vite server:', err);
  process.exit(1);
});
