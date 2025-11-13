//rutas publicas (registro, login)
const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authContollers');
// const { isAuthenticated } = require('../middlewares/authMiddleware'); // Comentado temporalmente

//pagina de inicio
router.get('/', (req, res) => {
    res.render('index');
});

//ruta de registro
router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', authControllers.register);

//ruta de login
router.get('/login', (req, res) => { // isAuthenticated comentado temporalmente
    const error = req.query.error || null;
    const success = req.query.success || null;
    res.render('login', { error, success });
});

router.post('/login', authControllers.login);

//ruta de logout
router.get('/logout', authControllers.logout);

module.exports = router;