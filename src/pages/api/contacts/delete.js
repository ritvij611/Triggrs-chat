import axios from 'axios';
import { EnvironmentFactory } from '../endpoint';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const environment = EnvironmentFactory.getEnvironment(process.env.STAGE);
  const {companyID, phoneNumber} = req.query;
  try {
    const response = await axios.delete(`${environment?.config?.wa?.apiUrl}/contacts/delete?companyID=${companyID}&phoneNumber=${phoneNumber}`);
    
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching data from backend:', error);
    res.status(error.response?.status || 500).json({
      error: error.response?.data,
      details: error.response?.data || null,
    });
  }
}