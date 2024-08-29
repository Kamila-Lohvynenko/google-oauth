import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';
(async () => {
  try {
    await initMongoConnection();
    setupServer();
  } catch (error) {
    console.log(error);
  }
})();
