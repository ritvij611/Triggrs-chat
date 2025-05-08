import axios from 'axios';
import jwt from 'jsonwebtoken';
import { EnvironmentFactory } from '../endpoint';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const environment = EnvironmentFactory.getEnvironment(process.env.STAGE);
  // console.log(apiUrl);
  try {
    const responseData = await axios({
      method: 'POST',
      url: `${environment?.config?.wa?.apiUrl}/auth/login/password`,
      data: req.body,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = responseData.data;

    if (!response.token) {
      throw new Error('No token received from backend');
    }

  

    // const token = jwt.sign(
    //   {
    //     user: response.user,
    //     exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
    //   },
    //   process.env.SESS_SECRET_TOKEN
    // );

    res.setHeader(
      'Set-Cookie',
      `twchat=${response.token}; Path=/; HttpOnly; SameSite=Lax; Secure`
    );

    res.status(responseData.status).json({message: response?.message});
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
