import axios from 'axios';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const backendUrl = 'https://dev-wa-api.triggrsweb.com/auth/login/password';
  
  try {
    const response = await axios.post(backendUrl, req.body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.data.token) {
      throw new Error('No token received from backend');
    }

    // Generate a new JWT token with the user data
    const token = jwt.sign({
      user: response.data.user,
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // Token expires in 24 hours
    }, process.env.SESS_SECRET_TOKEN);

    // Set the token in a cookie
    res.setHeader('Set-Cookie', `twchat=${token}; Path=/; HttpOnly; SameSite=Lax; Secure`);
    
    // Return the user data and token
    res.status(200).json({
      user: response.data.user,
      token: token
    });
  } catch (error) {
    console.error('Error fetching data from backend:', error);
    res.status(error.response?.status || 500).json({
      error: error.message,
      details: error.response?.data || null,
    });
  }
}
