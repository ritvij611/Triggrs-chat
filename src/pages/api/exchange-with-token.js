const axios = require('axios');

export default async function handler(req, res) {
    const {code, url} = req.body;
    try{
        const response = await axios({
            url: `https://graph.facebook.com/v17.0/oauth/access_token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${code}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const token = await response.data;
        // console.log(token);
        res.status(200).json(token);
    }catch(e){
        console.log(e.request);
        res.status(500).json({msg: 'Internal Server Error', error: e});
    }
  }