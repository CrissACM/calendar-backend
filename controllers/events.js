const { response } = require('express')
const Evento = require('../models/Evento')

async function getEventos(req, res = response) {
	const eventos = await Evento.find().populate('user', 'name')

	res.json({
		ok: true,
		eventos,
	})
}

async function crearEvento(req, res = response) {
	const evento = new Evento(req.body)

	try {
		evento.user = req.uid

		const eventoGuardado = await evento.save()

		res.status(201).json({
			ok: true,
			evento: eventoGuardado,
		})
	} catch (error) {
		console.error(error)

		res.status(500).json({
			ok: false,
			msg: 'Hable con el administrador',
		})
	}
}

async function actualizarEvento(req, res = response) {
	const eventoId = req.params.id
	const uid = req.uid

	try {
		const evento = await Evento.findById(eventoId)

		if (!evento) {
			return res.status(401).json({
				ok: false,
				msg: 'Evento no existe con ese id',
			})
		}

		if (evento.user.toString() !== uid) {
			return res.status(401).json({
				ok: false,
				msg: 'No tienes los privilegios de editar ese evento',
			})
		}

		const nuevoEvento = {
			...req.body,
			user: uid,
		}

		const eventoActualizado = await Evento.findByIdAndUpdate(
			eventoId,
			nuevoEvento
		)

		res.json({
			ok: true,
			evento: eventoActualizado,
		})
	} catch (error) {
		console.log(error)

		res.status(500).json({
			ok: false,
			msg: 'Hable con el administrador',
		})
	}
}

function eliminarEvento(req, res = response) {
	res.json({
		ok: true,
		msg: 'eliminarEventos',
	})
}

module.exports = {
	getEventos,
	crearEvento,
	actualizarEvento,
	eliminarEvento,
}
