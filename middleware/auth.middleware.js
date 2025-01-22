import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import user from '../Models/userSchema.js'

dotenv.config()
const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Token Missing' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    // const userr = await user.findById(req.user._id)
    // if (userr.role != 'admin') {
    //   res.status(401).json({ message: 'Access Denied' })
    // }
    next()
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export default authMiddleware
