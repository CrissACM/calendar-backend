const { response } = require('express')
const jwt = require('jsonwebtoken')

function validarJWT(req, res = response, next) {
	const token = req.header('x-token')

	if (!token) {
		res.status(401).json({
			ok: false,
			msg: 'No hay token en la petición',
		})
	}

	try {
		const payload = jwt.verify(token, process.env.SECRET_JWT_SEED)

		req.uid = payload.uid
		req.name = payload.name
	} catch (error) {
		console.log(error)
		return res.status(401).json({
			ok: false,
			msg: 'Token no valido',
		})
	}

	next()
}
// hola
module.exports = { validarJWT }
