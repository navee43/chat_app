import { Router } from "express";
import {accessChat ,
     fetchChats ,
     addSelfToGroup , 
    groupExit  ,
    createGroupChat,
    fetchGroupChat ,deleteChat} from '../controllers/Chat.controller.js'
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route('/accessChat').post(verifyJWT,accessChat)
router.route('/fetchChats').get(verifyJWT ,fetchChats)
router.route('/addSelfToGroup').put(verifyJWT, addSelfToGroup)
router.route('/groupExit').put(verifyJWT , groupExit)
router.route('/createGroupChat').post(verifyJWT , createGroupChat)
router.route('/fetchGroupChat').get(verifyJWT , fetchGroupChat)
router.route('/:chatId').delete(verifyJWT , deleteChat)
export default router 





