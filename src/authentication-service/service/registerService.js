import User from '../DB/userModel.js'
import bcrypt from 'bcrypt'
export const registerService = async (name, email, password) => {
  if (!name || !email || !password) {
    throw new Error('All fields are required')
  }

  const exsistingUser = await User.findOne({ email })
  if (exsistingUser) {
    throw new Error('User already exists')
  }
  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser = new User({ name, email, password: hashedPassword })
  await newUser.save()
  return newUser
}
