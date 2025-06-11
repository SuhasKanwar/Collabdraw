import { Router } from "express";

const router: Router = Router();

import { createRoomHandler, getChatsHandler } from "../controllers/roomController";

router.post("/create", createRoomHandler);
router.get("/chats/:roomId", getChatsHandler);

export default router;