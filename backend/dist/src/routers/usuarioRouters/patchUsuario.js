"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const usuario_1 = require("../../models/usuario");
exports.patchUsuarioRouter = express.Router();
/**
 * Funcion que actualiza los datos de un usuario por id.
 * Comprueba que los atributos que se van a editar estan permitidos.
 * Crea el objeto para modificar y lo actualiza.
 * Devolviendo estados en consecuencia a los errores.
 */
exports.patchUsuarioRouter.patch('/usuario', async (req, res) => {
    if (!req.query.id) {
        return res.status(400).send({
            error: 'Se debe proveer un id',
        });
    }
    const allowedUpdates = ['equipo'];
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update));
    if (!isValidUpdate) {
        return res.status(400).send({
            error: 'Update is not permitted',
        });
    }
    try {
        const usuario = await usuario_1.Usuario.findOneAndUpdate({ _id: req.query.id.toString() }, req.body, {
            new: true,
            runValidators: true,
        });
        if (!usuario) {
            return res.status(404).send();
        }
        return res.send(usuario);
    }
    catch (error) {
        return res.status(400).send(error);
    }
});
