import express from "express"
import { Router } from "express"
import { loginUser, logoutUser, registerUser } from "../controllers/user.controllers.js";
import { verifyjwt } from "../middleware/auth.middleware.js";

const router = Router();

router.get('/me', verifyjwt, (req, res) => {
  res.json({
    user: req.user
  });
});

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyjwt,logoutUser);

export default router;
