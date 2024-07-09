import jwt from 'jsonwebtoken';
import "dotenv/config";
import logger from '../logs/logger.js';

export function authenticateToken(req, res, next) {
    // Get token header value
    const authHeader = req.headers['authorization'];
    // Bearer <token>
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) res.sendStatus(401);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) res.sendStatus(403);
        logger.info(`User ${user.username} authenticated`);
        req.user = user;
        next();
    });
}