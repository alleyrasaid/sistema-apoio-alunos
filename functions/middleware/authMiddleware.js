const admin = require('firebase-admin');

async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Acesso não autorizado. Token não fornecido.' });
    }

    const idToken = authHeader.split('Bearer ')[1];

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        
        req.user = decodedToken;
        
        next();

    } catch (error) {
        console.error('Erro ao verificar token de autenticação:', error);
        return res.status(403).json({ message: 'Token inválido ou expirado. Acesso proibido.' });
    }
}

module.exports = authMiddleware;