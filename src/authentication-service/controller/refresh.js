import { generateAccessToken, verifyRefreshToken } from '../utils/jwtToken.js'

import jwt from 'jsonwebtoken'
export const refreshTokenController = (req, res) => {
  const { token } = req.body
  try {
    if (!token)
      return res.status(401).json({ message: 'Refresh token required' })

    const verifyRefresh= verifyRefreshToken(token)
    console.log(verifyRefresh);
    
      if (!verifyRefresh)
        return res
          .status(403)
          .json({ message: 'Invalid or expired refresh token' })

      const newAccessToken = generateAccessToken({id:verifyRefresh.userID,email:verifyRefresh.email})
      res.json({
        message: 'New access token generated',
        accessToken: newAccessToken
      })
   
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
