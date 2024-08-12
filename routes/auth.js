const { Router } = require('express')
const {
	crearUsuario,
	revalidarToken,
	loginUsuario,
} = require('../controllers/auth')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')
const router = Router()

router.post(
	'/new',
	[
		check('name', 'El name es obligatorio').not().isEmpty(),
		check('email', 'El email es obligatorio').isEmail(),
		check('password', 'El password debe de tener 6 caracteres').isLength({
			min: 6,
		}),
		validarCampos,
	],
	crearUsuario
)

router.post(
	'/',
	[
		check('email', 'El email es obligatorio').isEmail(),
		check('password', 'El password debe de tener 6 caracteres').isLength({
			min: 6,
		}),
		validarCampos,
	],
	loginUsuario
)

router.get('/renew', validarJWT, revalidarToken)
//hola

module.exports = router
