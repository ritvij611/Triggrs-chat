import axios from 'axios';
import { EnvironmentFactory } from '../endpoint';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  
  const environment = EnvironmentFactory.getEnvironment(process.env.STAGE);
  const { fileName, fileType, companyID, base64 } = JSON.parse(req.body);
  
  const binaryData = Buffer.from(base64, "base64");
  
  try {

    const response = await axios.post(`${environment?.config?.wa?.apiUrl}/templates/mediaupload?companyID=${companyID}&fileName=${fileName}&fileType=${fileType}`,
      binaryData,
      {
        headers: {
          'Content-type': fileType
        }
      }
    );
    
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching data from backend:', error);
    res.status(error.response?.status || 500).json({
      error: error.response?.data,
      details: error.response?.data || null,
    });
  }
}