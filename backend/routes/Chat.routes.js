import { Router } from "express";
import {accessChat ,
     fetchChats ,
     addSelfToGroup , 
    groupExit  ,
    createGroupChat,
    fetchGroupChat} from '../controllers/Chat.controller.js'
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route('/accessChat').post(verifyJWT,accessChat)
router.route('/fetchChats').get(verifyJWT ,fetchChats)
router.route('/addSelfToGroup').put(verifyJWT, addSelfToGroup)
router.route('/groupExit').put(verifyJWT , groupExit)
router.route('/createGroupChat').post(verifyJWT , createGroupChat)
router.route('/fetchGroupChat').get(verifyJWT , fetchGroupChat)

export default router 





