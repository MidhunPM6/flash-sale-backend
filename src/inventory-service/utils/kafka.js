// kafka/producer.js
import { Kafka } from 'kafkajs'

const kafka = new Kafka({
  clientId: 'inventory-service',
  brokers: ['localhost:9092']
})

export const kafkaProducer = kafka.producer()
const admin = kafka.admin()

const createTopic = async () => {
  await admin.connect()
  await admin.createTopics({
    topics: [
      {
        topic: 'stock-reservation-results',
        numPartitions: 1,
        replicationFactor: 1
      }
    ]
  })
  console.log('Topic created')
  await admin.disconnect()
}

createTopic().catch(console.error)
export const connectProducer = async () => {
  await kafkaProducer.connect()
  console.log('Kafka Producer connected')
}
