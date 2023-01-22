"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
/* Creación de un esquema para el modelo artista. */
const UsuarioSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate: (value) => {
            if (!validator_1.default.isAlphanumeric(value)) {
                throw new Error('El nombre solo puede contener caracteres alfanumericos');
            }
        },
    },
    contraseña: {
        type: String,
        required: true,
        trim: true,
    },
    equipo: {
        type: [],
        required: false,
        trim: true,
    }
});
/* Exportando el modelo `Usuario` con el esquema `UsuarioSchema`. */
exports.Usuario = mongoose_1.model('Usuario', UsuarioSchema);
