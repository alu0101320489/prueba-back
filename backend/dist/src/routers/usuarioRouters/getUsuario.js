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
exports.getUsuarioRouter = express.Router();
const jwt = require('jsonwebtoken');
/**
 * Funcion que obtiene a un usuario de la base de datos segun un nombre.
 * Comprueba que se disponga del parametro nombre en la query
 * y crea el filtro para la base de datos tratandolo como una cadena.
 * La bbdd se filtra y si se obtiene algun usuario se devuelve, en
 * caso contrario se informa de un error.
*/
exports.getUsuarioRouter.get('/usuario', async (req, res) => {
    const filter = req.query.nombre ? { nombre: req.query.nombre.toString() } : {};
    try {
        const usuario = await usuario_1.Usuario.find(filter);
        if (usuario.length !== 0) {
            return res.send(usuario);
        }
        return res.status(404).send();
    }
    catch (error) {
        return res.status(500).send();
    }
});
