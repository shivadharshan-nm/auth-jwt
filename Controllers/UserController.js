import user from '../Models/userSchema.js'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

//Register a new user or SignUP

export const registerUser = async (req, res) => {
  try {
    // username, email, password, role will be captured from req.body
    const { username, email, password, role } = req.body
    //before saving to DB password is then hashed using bcrypt package with rounds or salt (10)
    const hashPassword = await bcrypt.hash(password, 10)
    //newUSer document is created using the user object returned while creating collection
    const newUser = new user({ username, email, password: hashPassword, role })

    // newUser instance is saved in DB
    await newUser.save()
    res
      .status(200)
      .json({ message: 'User Registered Successfully', data: newUser })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const loginUser = async (req, res) => {
  try {
    //Email & password is captured from req.body & destructured
    const { email, password } = req.body
    // specific document for the logging user is captured using email and saved in userr
    const userr = await user.findOne({ email })
    // if no data is returned, that means email doesnt exist.
    if (!userr) {
      return res.status(404).json({ message: 'User Not Found' })
    }

    // if user exist compare the password from req.body with email user's email captured from DB
    const passwordMatch = await bcrypt.compare(password, userr.password)

    // if password does not match.
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid Password' })
    }

    // If password matches, token is generated using jwt.sign with 3 params,
    // 1. id param takes the userr._id field from document,
    // 2. 2nd param is the JWT secret key from .env file
    // 3. 3rd param is the duration in which the token should expire
    const token = jwt.sign({ _id: userr._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })
    // Set found token in the field of, found userdetails document
    userr.token = token

    //saving the userdetails document along with the token in DB collection
    await userr.save()
    res
      .status(200)
      .json({ message: 'User Logged In Successfully', token: token })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getUser = async (req, res) => {
  try {
    // console.log('Controller', req.user._id)
    //gets the _id from  req.user property set by authMiddleware and assigns it to iserId
    const userId = req.user._id
    //find the userdetails based on userId
    const userr = await user.findById(userId)
    res.status(200).json({ message: 'Authorized User', data: userr })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
