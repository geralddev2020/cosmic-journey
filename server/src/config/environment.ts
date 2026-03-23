import dotenv from "dotenv";

import { environmentSchema } from "../schema/env.schema";

dotenv.config();

export const env = environmentSchema.parse(process.env);
