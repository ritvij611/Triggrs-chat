import axios from 'axios';
import FormData from 'form-data';
import { EnvironmentFactory } from '../endpoint';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const environment = EnvironmentFactory.getEnvironment(process.env.STAGE);
  const { fileName, fileType, companyID, base64, category } = JSON.parse(req.body);
  const binaryData = Buffer.from(base64, 'base64');

  try {
    // Get pre-signed POST URL and fields
    const presignRes = await axios.post(
      `${environment?.config?.wa?.apiUrl}/files/upload`,
      {
        companyID,
        fileName,
        fileType
      }
    );

    const { url, fields } = presignRes.data;

    // Upload to S3 using form-data
    const form = new FormData();
    Object.entries(fields).forEach(([key, value]) => {
      form.append(key, value);
    });
    form.append('file', binaryData, {
      filename: fileName,
      contentType: fileType,
    });

    await axios.post(url, form, {
      headers: form.getHeaders(),
    });

    // Notify backend
    const saveResult = await axios.post(
      `${environment?.config?.wa?.apiUrl}/files/save-upload`,
      {
        companyID,
        fileName,
        category,
        link: `${url}${fields.key}`,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(200).json(saveResult.data);
  } catch (error) {
    console.error('Upload error:', error.response?.data || error);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || 'Upload failed',
    });
  }
}
