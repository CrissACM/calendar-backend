const { response } = require('express')

async function getEventos(req, res = response) {
	res.json({
		ok: true,
		msg: 'getEventos',
	})
}
function crearEvento(req, res = response) {
	res.status(201).json({
		ok: true,
		msg: 'crearEventos',
	})
}
function actualizarEvento(req, res = response) {
	res.json({
		ok: true,
		msg: 'actualizarEventos',
	})
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
