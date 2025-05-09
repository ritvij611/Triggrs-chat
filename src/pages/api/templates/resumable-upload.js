import axios from 'axios';
import { EnvironmentFactory } from '../endpoint';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
 
  const environment = EnvironmentFactory.getEnvironment(process.env.STAGE);
  const {companyID, fileName, fileLength, fileType} = req.query;
  try {
    const response = await axios.post(`${environment?.config?.wa?.apiUrl}/templates/mediaupload?companyID=${companyID}&fileName=${fileName}&fileLength=${fileLength}&fileType=${fileType}`,
      req.body
    );
    
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching data from backend:', error);
    res.status(error.response?.status || 500).json({
      error: error.message,
      details: error.response?.data || null,
    });
  }
}