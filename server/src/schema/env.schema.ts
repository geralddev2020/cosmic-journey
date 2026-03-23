import z from "zod";

export const environmentSchema = z.object({
  HOST: z.string().default("localhost"),
  PORT: z.coerce.number().default(3000),
  NASA_API_KEY: z.string().nonempty(),
  CORS_ORIGIN: z.string().default("*"),
});
