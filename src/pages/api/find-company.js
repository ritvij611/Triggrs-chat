import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const backendUrl = 'https://dev-wa-api.triggrsweb.com/companies/getorcreate';
  // console.log(req.body);
  try {
    const response = await axios.post(backendUrl, req.body, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    // Return the external API's response
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error fetching subscription from backend:', error.response.data);
    res.status(error.response?.status || 500).json({
      error: error.message,
      details: error.response?.data || null,
    });
  }
}
