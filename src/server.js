import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import connectDB from './Database/config.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.json())
connectDB()

app.post('/', (req, res) => {
  console.log(req.body)
})

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})
