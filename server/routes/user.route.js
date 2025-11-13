import express from 'express'
import { registeruser , loginuser} from '../controller/user.controller.js'

const userRouter = express.Router()

userRouter.post('/register', registeruser)
userRouter.post('/login', loginuser)

export { userRouter }