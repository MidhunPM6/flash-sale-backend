import { loginUser } from '../controller/login.js'
import { refreshTokenController } from '../controller/refresh.js'
import { registerUser } from '../controller/register.js'


import express from 'express'
const authRoutes = express.Router()

authRoutes.post('/register', registerUser)
authRoutes.post('/login',loginUser)
authRoutes.get('/refresh-token',refreshTokenController)

export default authRoutes
