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
exports.deleteUsuarioRouter = express.Router();
/**
 * Funcion que elimina un usuario de la base de datos segun un nombre
 * Comprueba que se reciba el nombre del usuario y que esta exista en la bbdd.
 * En caso afirmativo la elimina y en cualquier otro caso informa de un error.
*/
exports.deleteUsuarioRouter.delete('/usuario', async (req, res) => {
    if (!req.query.nombre) {
        return res.status(400).send({
            error: 'Se debe proveer un nombre',
        });
    }
    try {
        const usuario = await usuario_1.Usuario.findOneAndDelete({ nombre: req.query.nombre.toString() });
        if (!usuario) {
            return res.status(404).send();
        }
        return res.send(usuario);
    }
    catch (error) {
        return res.status(400).send();
    }
});
