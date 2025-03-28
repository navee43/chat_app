import Router from 'express'

import {sendMessage , allMessages} from '../controllers/Message.controller.js'
// import { verify } from 'jsonwebtoken'
import { verifyJWT } from '../middlewares/auth.middleware.js'

const router = Router()


router.route('/:chatId').get(verifyJWT , allMessages)
router.route('/sendmessage').post(verifyJWT , sendMessage);


export default router