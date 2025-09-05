import User from '../DB/userModel.js'
import bcrypt from 'bcrypt'

export const loginService = async (email, password) => {
  if (!email || !password) {
    throw new Error('All fields are required')
  }
  const findUser = await User.findOne({ email })
  if (!findUser) {
    throw new Error('User not found')
  }
  const isPasswordValid = await bcrypt.compare(password, findUser.password)
  if (!isPasswordValid) {
    throw new Error('Invalid password')
  }
  return findUser
}
