const jwt = require('jsonwebtoken');

const authMiddlware = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        console.error('Error in authMiddleware:', error);
        res.status(401).json({ message: 'Token is invalid' });
    }

};
module.exports = authMiddlware;