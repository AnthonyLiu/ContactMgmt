import { Router } from "express";
import UserController from "@controllers/user.controllers";

const router = Router();

router.get("/", UserController.getUser);
router.post("/register", UserController.postUser);

export default router;
