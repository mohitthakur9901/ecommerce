import jwt from 'jsonwebtoken';
import {errorHandler} from '../utils/error.js'

export const verifyJwt = (req, res, next) => {
    const authHeader = req.cookies.access_token;
    // console.log(authHeader);
    if (!authHeader) {
       next(errorHandler(401, "You are not authenticated"))
    }
    jwt.verify(authHeader, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            next(errorHandler(403, "Token is not valid"))
        }
        req.user = user;
        next();
    })
}

