import axios from 'axios';
import { EnvironmentFactory } from './endpoint';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const environment = EnvironmentFactory.getEnvironment(process.env.STAGE);
  // console.log(apiUrl);
  try {
    const responseData = await axios({
      method: 'GET',
      url: `${environment?.config?.wa?.apiUrl}/companies`,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = responseData.data;  

    res.status(responseData.status).json(response);
  } catch(e){
    console.log('Error while create visa', e);
    if(e.response && e.response.data && typeof e.response.data == 'object'){
        res.status(e.status).json(e.response.data);
    }else if(e.response && e.response.data && typeof e.response.data == 'string'){
        res.status(e.status).json({message: e.response.data});
    }else{
        res.status(e.status).json({message: 'Something went wrong'});
    }
}
}
