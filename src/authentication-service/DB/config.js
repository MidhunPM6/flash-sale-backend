import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectDB = async () => {
  const MONGO_USERNAME = process.env.MONGO_USERNAME
  const MONGO_PASSWORD = process.env.MONGO_PASSWORD
  try {
    await mongoose.connect(
      `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.p2cn2fu.mongodb.net/quicksale?retryWrites=true&w=majority&appName=Cluster0`
    )
    console.log('MongoDB connected successfully')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  }
}

export default connectDB
