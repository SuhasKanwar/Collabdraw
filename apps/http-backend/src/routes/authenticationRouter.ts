import { Router } from "express";

import { signupHandler, signinHandler, logoutHandler } from "../controllers/authenticationHandler";

const router: Router = Router();

router.post("/signup", signupHandler);
router.post("/signin", signinHandler);
router.get("/logout", logoutHandler);

export default router;