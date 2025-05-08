import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const backendUrl = 'https://dev-wa-api.triggrsweb.com/auth/register';
  //console.log(req.body);
  try {
    // Forward the POST request to the external API
    
    const response = await axios.post(backendUrl, req.body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    // Return the external API's response
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error fetching data from backend:', error.message);
    res.status(error.response?.status || 500).json({
      error: error.message,
      details: error.response?.data || null,
    });
  }
}
