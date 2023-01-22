import * as express from 'express';
import { Usuario } from '../../models/usuario';
import { verifyToken } from './postUsuario';

export const patchUsuarioRouter = express.Router();

/**
 * Funcion que actualiza los datos de un usuario por id.
 * Comprueba que los atributos que se van a editar estan permitidos.
 * Crea el objeto para modificar y lo actualiza.
 * Devolviendo estados en consecuencia a los errores.
 */
patchUsuarioRouter.patch('/usuario', async (req, res) => {
  if (!req.query.id) {
    return res.status(400).send({
      error: 'Se debe proveer un id',
    });
  }

  const allowedUpdates = ['equipo'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate =
    actualUpdates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    return res.status(400).send({
      error: 'Update is not permitted',
    });
  }

  try {
    const usuario =
      await Usuario.findOneAndUpdate({ _id: req.query.id.toString() }, req.body, {
        new: true,
        runValidators: true,
      });

    if (!usuario) {
      return res.status(404).send({error: 'Wrong user',
      });
    }

    return res.send(usuario);
  } catch (error) {
    return res.status(400).send(error);
  }
});
