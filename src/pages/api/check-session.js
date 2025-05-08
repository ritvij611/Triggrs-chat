// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req, res) {
    const token = req.cookies.twchat;
    
    try {
        if (!token) {
            return res.status(401).json({
                status: 401,
                message: "No token provided",
                authorised: false
            });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.SESS_SECRET_TOKEN);
        
        return res.status(200).json({
            user: decoded.user,
            authorised: true
        });    
    } catch (e) {
        console.error('Error verifying token:', e);
        return res.status(401).json({
            status: 401,
            message: e.message || "Invalid token",
            authorised: false
        });
    }
}