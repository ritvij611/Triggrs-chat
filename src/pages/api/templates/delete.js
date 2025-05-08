import axios from 'axios';
import { EnvironmentFactory } from '../endpoint';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const environment = EnvironmentFactory.getEnvironment(process.env.STAGE);
  const {companyID, name} = req.query;
  try {
    const response = await axios.post(`${environment?.config?.wa?.apiUrl}/templates/delete?companyID=${companyID}&name=${name}`,
      req.body,
      {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data);
    res.status(200).json({
      message: response?.data?.body
    });
  } catch (error) {
    console.error('Error fetching data from backend:', error);
    res.status(error.response?.status || 500).json({
      error: error.message,
      details: error.response?.data || null,
    });
  }
}