import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './Database/dbConfig.js'
import router from './Routers/userRouter.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

connectDB()

app.get('/', (req, res) => {
  res.status(200).send('Welcome to User Auth API')
})

app.use('/api/auth', router)

const port = process.env.PORT || 4000
app.listen(port, () =>
  console.log('User Auth Server started and running on port', port)
)
