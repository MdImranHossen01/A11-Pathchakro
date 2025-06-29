const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
   
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send({ message: 'unauthorized access' });
    }

  
    const token = authHeader.split(' ')[1];

   
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log('Token verification failed:', err);
            return res.status(401).send({ message: 'unauthorized access' });
        }
        req.user = decoded;
        next();
    });
};

module.exports = verifyToken;