import Product from "../DB/productModel.js"
import Reservation from "../DB/reservationModel.js"
import { kafkaProducer } from "../utils/kafka.js"

export const addProductService = async (productName, price, stock) => {
  if (!productName || !price || !stock) {
    throw new Error('All fields are required')
  }

  const newProduct = new Product({
    productName,
    price,
    stock
  })
  await newProduct.save()

  return newProduct
}

export const getProductService = async () => {
  const products = await Product.find({})
  if (!products) {
    throw new Error('No products found')
  }
  return products
}

export const updateProductService = async (id, productName, price, stock) => {
  if (!id || !productName || !price || !stock) {
    throw new Error('All fields are required')
  }
  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    { productName, price, stock },
    { new: true }
  ).lean()
  if (!updatedProduct) {
    throw new Error('Product not found')
  }
  return updatedProduct
}

export const reserveProductService = async (productId, quantity) => {
  if (!productId || !quantity) {
    throw new Error('All fields are required')
  }
  const updatedProduct = await Product.findOneAndUpdate(
    { _id: productId, stock: { $gte: quantity } },
    { $inc: { stock: -quantity } },
    { new: true }
  ).lean()

  let reservation
  if (!updatedProduct) {
      reservation = await Reservation.create({
        productId,
        quantity,
        status: 'FAILED',
        reason: 'Not enough stock'
      })

      await kafkaProducer.send({
        topic: 'stock-reservation-results',
        messages: [
          {
            value: JSON.stringify({
              productId,
              status: 'FAILED',
              reason: 'Not enough stock'
            })
          }
        ]
      })
      throw new Error('Not enough stock')
    
  }
  reservation = await Reservation.create({
    productId,
    quantity,
    status: 'SUCCESS'
  })

  await kafkaProducer.send({
    topic: 'stock-reservation-results',
    messages: [
      {
        value: JSON.stringify({
          productId,
          quantity,
          status: 'SUCCESS',
          stockLeft: updatedProduct.stock
        })
      }
    ]
  })


  return updatedProduct
}
