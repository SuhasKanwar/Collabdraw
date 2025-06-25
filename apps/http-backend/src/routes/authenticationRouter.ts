import { Router } from "express";

import { signupHandler, signinHandler } from "../controllers/authenticationHandler";

const router: Router = Router();

router.post("/signup", signupHandler);
router.post("/signin", signinHandler);

export default router;