import { createApp } from './main.base';
import { EnvService } from './modules/env/services/env.service';

async function dev() {
  const app = await createApp();
  const config = await app.get(EnvService);

  app.enableCors();

  await app.listen(config.PORT);
}

dev();
