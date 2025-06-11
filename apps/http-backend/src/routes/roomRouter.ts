import { Router } from "express";

const router: Router = Router();

import { createRoomHandler } from "../controllers/roomController";

import { authenticationMiddleware } from "../middlewares/authentication";

router.post("/create", authenticationMiddleware, createRoomHandler);

export default router;