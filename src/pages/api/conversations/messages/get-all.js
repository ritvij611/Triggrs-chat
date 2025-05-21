import axios from 'axios';
import { EnvironmentFactory } from '../../endpoint';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const environment = EnvironmentFactory.getEnvironment(process.env.STAGE);
    const {phoneID, waID, index, limit} = req.query;
    try {
        const response = await axios.get(`${environment?.config?.wa?.apiUrl}/conversations/messages?phoneID=${phoneID}&waID=${waID}&limit=${limit||10}&index=${index||0}`);
        
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching data from backend:', error);
        res.status(error.response?.status || 500).json({
        error: error.response?.data,
        details: error.response?.data || null,
        });
    }
}