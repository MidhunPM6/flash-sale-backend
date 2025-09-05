import express from 'express'
import cors from 'cors'
import connectDB from './DB/config.js'
import authRoutes from './routes/authRoutes.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
connectDB()

app.get('/', (req, res) => {
  res.send('Authentication Service is running')
})

app.use('/authentication', authRoutes)

app.listen(PORT, () => {
  console.log(`Authentication Service is running on port ${PORT}`)
})
