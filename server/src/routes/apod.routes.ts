import { Router } from "express";

import { getAPODEntries } from "../controllers/apod.controller";
import { asyncHandler } from "../lib/asyncHandler";

const apodRouter = Router();

apodRouter.get("/", asyncHandler(getAPODEntries));

export default apodRouter;
