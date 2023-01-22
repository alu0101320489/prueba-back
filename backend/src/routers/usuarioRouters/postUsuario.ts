import * as express from 'express';
import { Usuario } from '../../models/usuario';

export const postUsuarioRouter = express.Router();

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

//Router para crear un usuario nuevo en la base de datos
postUsuarioRouter.post('/register', async (req, res) => {
  bcrypt.hash(req.body.contraseña, 10, function(err, hash) {
    req.body.contraseña = hash;
    const usuario = new Usuario(req.body);
    usuario.equipo = ["","","","","",""];
    try {
      usuario.save();
      res.status(201).send(usuario);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
});
//Router para logearse en la aplicacion, devuelve el token de autentificacion, nombre,id y equipo
postUsuarioRouter.post('/login', async (req, res) => {
  bcrypt.hash(req.body.contraseña, 10, async function(err, hash) {
    const filter = {nombre: req.body.nombre.toString()};

    try {
      const usuario = await Usuario.find(filter);

      if (usuario.length !== 0) {
        bcrypt.compare(req.body.contraseña,usuario[0].contraseña, (err, data) => {
          if (err) throw err
          if (data) {
            const token = jwt.sign(JSON.stringify(usuario), 'stil');
            return res.status(200).json({token, id: usuario[0]._id,nombre: usuario[0].nombre ,equipo: usuario[0].equipo});
          } else {
            return res.status(401).json({ msg: "Invalid credencial"})
          }
        })

      }else {return res.status(404).json({ msg: "Usuario incorrecto"})}
      
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
});

//Funcion para verificar el token de autentificacion
export function verifyToken(req,res, next){
  if(!req.headers.authorization) return res.status(401).json('No autorizado');

  const token = req.headers.authorization.substr(7);
  if(token!==''){
    const content = jwt.verify(token,'stil');
    req.data = content;
    next();
  }else{
    res.status(401).json('Token vacio');
  }
}