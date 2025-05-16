import axios from 'axios';
import { EnvironmentFactory } from '../endpoint';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const environment = EnvironmentFactory.getEnvironment(process.env.STAGE);
  
  try {
    const response = await axios.post(`${environment?.config?.wa?.apiUrl}/contacts/create`,
      req.body,
      {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching data from backend:', error.response?.data);
    res.status(error.response?.status || 500).json({
      error: error.response?.data,
      details: error.response?.data || null,
    });
  }
}