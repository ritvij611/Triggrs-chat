// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const jwt = require('jsonwebtoken');

export default function handler(req,res) {
    const token = req.body.token;
    try {
        if (token) {
          const decoded = jwt.verify(token, process.env.SESS_SECRET_TOKEN);
          return res.status(200).json({
            ...decoded,
            present: true
           });    
        }

        return res.status(401).json({
            status: 401,
            message: "No company found",
            present: false
        });
    } catch (e) {
        console.error('Error verifying token:', e);
        return res.status(401).json({
            status: 401,
            message: "Invalid or expired token",
            present: false
        });
    }
  
}