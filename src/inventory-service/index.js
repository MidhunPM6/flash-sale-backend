import express from 'express'
import cors from 'cors'
import connectDB from './DB/config.js'
import productRoutes from './routes/productRoutes.js'
import { connectProducer } from './utils/kafka.js'

const app = express()
const PORT = process.env.PORT || 6000

const startServer = async () => {
  try {
    await connectProducer()
    console.log('Kafka producer connected ')

    await connectDB()
    console.log('MongoDB connected ')

    app.use(cors())
    app.use(express.json())

    app.get('/', (req, res) => {
      res.send('Catalog and Inventory Service is running')
    })
    app.use('/product', productRoutes)

    app.listen(PORT, () => {
      console.log(`Catalog and Inventory Service is running on port ${PORT}`)
    })
  } catch (err) {
    console.error('Failed to start server:', err)
    process.exit(1)
  }
}

startServer()
