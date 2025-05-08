import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  const queryParams = req.query;
  const fields = queryParams.fields;
  const backendUrl = 'https://dev-wa-api.triggrsweb.com/companies';
  //console.log(req.body);
  try {
    const response = await axios.get(`${backendUrl}/fields=${fields}`, {
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
