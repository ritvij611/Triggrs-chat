import axios from 'axios';
import { EnvironmentFactory } from '../../endpoint';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const environment = EnvironmentFactory.getEnvironment(process.env.STAGE);
    const {phoneID, waID, message, imageURL, docURL, fileName} = req.body;
    const content = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: waID,
        type: imageURL ? "image" : docURL ? "document" : 'text',
    }

    if(imageURL){
        content.image = {
            link: imageURL,
            caption: message,
        }
    } else if(docURL){
        content.document = {
            link: imageURL,
            caption: message,
            filename: fileName,
        }
    } else {
        content.text = {
            preview_url: false,
            body: message
        }
    }
    try {
        const response = await axios.post(
            `${environment?.config?.wa?.apiUrl}/message/${phoneID}`,
            {                
                content               
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