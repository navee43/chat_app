import { Router } from "express";
import {Register, Login ,Logout, getUsers} from '../controllers/user.controller.js'
import { upload } from "../middlewares/multer.middleware.js";
// import { verify } from "jsonwebtoken";
import { verifyJWT } from "../middlewares/auth.middleware.js";
// import {  getUserChats , createGroupChat} from "../controllers/Chat.controller.js";
// import {sendMessage , } from '../controllers/Message.controller.js'
// import { sendChatRequest ,getPendingRequests , acceptChatRequest, rejectChatRequest } from "../controllers/ChatRequestController.js";

const router = Router()


router.route("/register").post(upload.single("image"),Register)
router.route('/login').post(Login)
router.route('/logout').post(verifyJWT,Logout)
router.route('/getusers').get(getUsers)
// router.route('/one-on-one').get(createOneOnOneChat)
// router.route('/:userId').get(getUserChats)
// router.route('/group').get(createGroupChat)
// router.route('/sendMessage').get(sendMessage)
// router.route("/:chatId").get(getChatMessages)
// router.route('/seen').get(markAsSeen)
    // router.route('/send').post(verifyJWT ,  sendChatRequest)
    // router.route('/pending/:userId').get(verifyJWT ,getPendingRequests)
    // router.route('/accept/:requestId').post(verifyJWT ,acceptChatRequest)
    // router.route('/reject/:requestId').post(verifyJWT , rejectChatRequest)

export default router;


