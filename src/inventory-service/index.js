import express from 'express'
import cors from 'cors'
import connectDB from './DB/config.js'
import productRoutes from './routes/productRoutes.js'

const app = express()
const PORT = process.env.PORT || 6000

app.use(cors())
app.use(express.json())
connectDB()

app.get('/', (req, res) => {
  res.send(' Catalog and Inventory Service is running')
})

app.use('/product', productRoutes)

app.listen(PORT, () => {
  console.log(
    `Catalog and Inventory Service is running on port ${PORT}`
  )
})
