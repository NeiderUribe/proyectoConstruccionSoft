//registro, login y logout del usuario
const bycript = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../dataBase/connection');
const { cache } = require('react');

//hacer el registro de un nuevo usuario
const register = async (req, res, next) =>{
    try {
        const { name, mail, cellular, password, addres, confirmPassword } = req.body;   
        //hacer validaciones de campos
        if (!name || !mail || !password || confirmPassword) {
            return res.status(400).render('register', {error: 'Por favor complete todos los campos obligatorios' });
        }

        //comparar las contraseñas
        
        if (password !== confirmPassword) {
            return res.status(400).render('register', { error: 'Las contraseñas no coinciden' 
            });
        }

        //validar que solo exista 1 correo o que no este repetido
        const [exisEmail] = await db.query 
        ('SELECT  mail FROM user WHERE mail = ?', [mail]);
        if (exisEmail.length > 0) {
            return res.status(400).render('register', { error: 'El correo ya está registrado' });

        //encriptar la contraseña
        const hashedPassword = await bycript.hash(password);

        //guardar el usuario en la base de datos
        await db.query('INSERT INTO User (name, mail, cellular, password, address) VALUES (?, ?, ?, ?, ?)', 
        [name, mail, cellular, password, addres]);
        res.redirect('/login?success=Usuario registrado');

    } catch (error) {
        console.error('Error en el registro del usuario:', error);
        res.status(500).render('register', { error: 'Error en el servidor. Por favor intente nuevamente.' });
    }
};

//hacer el login del usuario
const login = async (req, res, next) =>{
    try{
        const { mail, password } = req.body;
         //validar que los campos no esten vacios
        if (!mail || !password) {
            return res.status(400).render('login', { 
                error: 'Por favor complete todos los campos obligatorios' 
            });
        }
        //validar que el correo exista en la base de datos
        const [SearchEmail] = await db.query 
            ('SELECT * FROM Users WHERE mail = ?', [mail]);

        //verificar el password
        const validPassword = await bycript.compare(password, SearchEmail[0].password)

        const token = jwt.sign(
            { id: SearchUser[0].id, email: SearchUser[0].mail , name: SearchUser[0].name},
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
        );

        //generar la cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000 //1 hora
        });

        res.redirect('/dashboard');
    }
    catch (error) {
        console.error('Error en el login del usuario:', error);
        res.status(500).render('login', { error: 'Error en el servidor. Por favor intente nuevamente.' 
        });  
    }
};
//hacer el logout del usuario
const logout = (req, res, next) =>{
    //res.clearcookie('token') limpia cache
    res.redirect('login?success=cerro sesion conexitosamente');
};

module.exports = {
    register,
    login,
    logout
};