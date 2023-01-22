import { Document, Schema, model } from 'mongoose';
import validator from 'validator';

/* Definición de la interfaz para el modelo. */
interface Usuario extends Document {
  nombre: string,
  contraseña: string,
  equipo: string[]
}

/* Creación de un esquema para el modelo artista. */
const UsuarioSchema = new Schema({
  nombre: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate: (value: string) => {
      if (!validator.isAlphanumeric(value)) {
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
export const Usuario = model<Usuario>('Usuario', UsuarioSchema);