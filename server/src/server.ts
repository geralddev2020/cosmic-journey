import { json, urlencoded } from "body-parser";
import cors from "cors";
import express, { type Express } from "express";
import morgan from "morgan";

import { env } from "./config/environment";
import { ROUTES } from "./constants/routes";
import apodRouter from "./routes/apod.routes";

export const createServer = (): Express => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(
      cors({
        origin: env.CORS_ORIGIN,
      }),
    )
    .use(ROUTES.APOD, apodRouter)
    // Just a simple status endpoint for testing purposes
    .get(ROUTES.HEALTH, (_, res) => {
      return res.json({ ok: true });
    });
  return app;
};
