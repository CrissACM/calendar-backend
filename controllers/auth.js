const { response } = require('express')
const bcrypt = require('bcryptjs')
const UsuarioSchema = require('../models/Usuario')
const { generarJWT } = require('../helpers/jwt')

async function crearUsuario(req, res = response) {
	const { email, password } = req.body

	try {
		let usuario = await UsuarioSchema.findOne({ email })

		if (usuario) {
			return res.status(400).json({
				ok: false,
				msg: 'Un usuario existe con ese correo',
			})
		}

		usuario = new UsuarioSchema(req.body)

		const salt = bcrypt.genSaltSync()
		usuario.password = bcrypt.hashSync(password, salt)

		await usuario.save()

		const token = await generarJWT(usuario.id, usuario.name)

		res.status(201).json({
			ok: true,
			uid: usuario.id,
			name: usuario.name,
			token,
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			ok: false,
			msg: 'Por favor hable con el administrador',
		})
	}
}

async function loginUsuario(req, res = response) {
	const { email, password } = req.body

	try {
		let usuario = await UsuarioSchema.findOne({ email })

		if (!usuario) {
			return res.status(400).json({
				ok: false,
				msg: 'El usuario no existe con ese email',
			})
		}

		const validPassword = bcrypt.compareSync(password, usuario.password)

		if (!validPassword) {
			return res.status(400).json({
				ok: false,
				msg: 'Password incorrecto',
			})
		}

		const token = await generarJWT(usuario.id, usuario.name)

		res.json({
			ok: true,
			uid: usuario.id,
			name: usuario.name,
			token,
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			ok: false,
			msg: 'Por favor hable con el administrador',
		})
	}
}

async function revalidarToken(req, res = response) {
	const { uid, name } = req

	const token = await generarJWT(uid, name)

	res.json({
		ok: true,
		token,
	})
}

module.exports = { crearUsuario, loginUsuario, revalidarToken }
