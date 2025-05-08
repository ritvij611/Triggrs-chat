import jwt from 'jsonwebtoken';
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Get token from cookies
    const token = req.cookies.twchat;
    
    if (!token) {
      return res.status(401).json({
        status: 401,
        message: "No token provided",
        authorised: false
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.SESS_SECRET_TOKEN);
    
    // Fetch user companies from backend
    const backendUrl = 'https://dev-wa-api.triggrsweb.com/api/user/companies';
    const response = await axios.get(backendUrl, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    return res.status(200).json({
      companies: response.data
    });
  } catch (error) {
    console.error('Error fetching user companies:', error);
    return res.status(error.response?.status || 500).json({
      error: error.message,
      details: error.response?.data || null,
    });
  }
}
