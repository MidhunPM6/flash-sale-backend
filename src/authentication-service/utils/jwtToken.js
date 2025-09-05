import jwt from 'jsonwebtoken'

export const generateAccessToken = user => {
  try {
    return jwt.sign(
      { userID: user._id, email: user.email },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '10min'
      }
    )
  } catch (error) {
    console.error('Error generating token:', error.message)
    throw new Error('Failed to generate token')
  }
}

export const generateRefreshToken = user => {
  try {
    return jwt.sign(
      { userID: user._id, email: user.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' }
    )
  } catch (error) {
    console.error('Error generating refresh token:', error.message)
    throw new Error('Failed to generate refresh token')
  }
}

export const verifyAccessToken = token => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET_KEY)
  } catch (error) {
    console.error('Error verifying token:', error.message)
    throw new Error('Invalid or expired token')
  }
}

export const verifyRefreshToken = token => {
  try {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
  } catch (error) {
    console.error('Error verifying refresh token:', error.message)
    throw new Error('Invalid or expired refresh token')
  }
}
