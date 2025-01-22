import mongoose from 'mongoose'

//role will later be added by admin
//token will later be generated from JWT
const userSchema = new mongoose.Schema({
  username: String,
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  token: String,
  role: String,
})

// Created User collection in DB and returned Mongoose Object
const user = mongoose.model('User', userSchema)

export default user
