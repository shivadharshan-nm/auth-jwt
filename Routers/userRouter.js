import express from 'express'
import {
  getUser,
  loginUser,
  registerUser,
} from '../Controllers/UserController.js'
import authMiddleware from '../middleware/auth.middleware.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
//Protected Route using middleware (JWT.verify)
router.get('/getuser', authMiddleware, getUser)

export default router
