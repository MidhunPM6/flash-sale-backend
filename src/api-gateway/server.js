import express from 'express'
import cors from 'cors'
import proxy from 'express-http-proxy'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json({ limit: '10mb' }))

app.get('/', (req, res) => {
  res.send('API Gateway is running')
})

app.use('/auth', proxy('http://localhost:5001', {
  proxyReqPathResolver: req => req.originalUrl.replace(/^\/auth/, ''),
}))

app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`)
})