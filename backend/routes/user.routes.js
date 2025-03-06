import { Router } from "express";
import {Register, Login ,Logout} from '../controllers/user.controller.js'
import { upload } from "../middlewares/multer.middleware.js";
// import { verify } from "jsonwebtoken";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()


router.route("/register").post(upload.single("image"),Register)
router.route('/login').post(Login)
router.route('/logout').post(verifyJWT,Logout)

export default router;


