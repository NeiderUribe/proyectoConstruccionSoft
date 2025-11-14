//verificacion de JWT y las rutas que cree
const jwt = require('jsonwebtoken');

//verificacion del token
const verifytoken = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.redirect('/login?error=Por favor inicie sesion para continuar');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tierra-querida-jwt-secret-2025');
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Error de verificación de token:', error);
        res.clearCookie('token');
        return res.redirect('/login?error=Sesión inválida. Por favor inicie sesión nuevamente');    
    }
};

// Generar token JWT
function generateToken(user) {
    return jwt.sign(
        { 
            id: user.id_user || user.id,
            email: user.mail || user.email,
            name: user.name,
            isAdmin: user.isAdmin || false
        },
        process.env.JWT_SECRET || 'tierra-querida-jwt-secret-2025',
        { expiresIn: '24h' }
    );
}

// Verificar si está autenticado (para usuarios)
const isAuthenticated = (req, res, next) => {
    if (req.session && (req.session.userId || req.session.isAdmin)) {
        return next();
    }
    res.redirect('/login?error=Debes iniciar sesión para continuar');
};

module.exports = { verifytoken, generateToken, isAuthenticated };