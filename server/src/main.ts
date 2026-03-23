import { env } from "./config/environment";
import { log } from "./lib/logger";
import { createServer } from "./server";

const server = createServer();

export const serverInstance = server.listen(env.PORT, env.HOST, () => {
  log(`api running on ${env.PORT}`);
});
