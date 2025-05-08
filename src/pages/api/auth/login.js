import axios from 'axios';
import jwt from 'jsonwebtoken';
import { EnvironmentFactory } from '../endpoint';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const environment = EnvironmentFactory.getEnvironment(process.env.STAGE);
  // console.log(apiUrl);
  try {
    const response = await axios({
      method: 'POST',
      url: `${environment?.config?.wa?.apiUrl}/auth/login/password`,
      data: req.body,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.data.token) {
      throw new Error('No token received from backend');
    }

    const token = jwt.sign(
      {
        user: response.data.user,
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
      },
      process.env.SESS_SECRET_TOKEN
    );

    res.setHeader(
      'Set-Cookie',
      `twchat=${token}; Path=/; HttpOnly; SameSite=Lax; Secure`
    );

    res.status(200).json({
      user: response.data.user,
      token: token,
    });
  } catch (error) {
    console.error('Error fetching data from backend:', error);
    res.status(error.response?.status || 500).json({
      error: error.message,
      details: error.response?.data || null,
    });
  }
}
