import express from 'express';
import {connect} from 'mongoose';
//import './db/mongoose';

import {postDamageRouter} from './routers/usuarioRouters/postDamage';
import {postUsuarioRouter} from './routers/usuarioRouters/postUsuario';
import {patchUsuarioRouter} from './routers/usuarioRouters/patchUsuario';


import {defaultRouter} from './routers/default';
import { Mongoose } from 'mongoose';

const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());

app.use(postUsuarioRouter);
app.use(postDamageRouter);
app.use(patchUsuarioRouter);

app.use(defaultRouter);

const port = process.env.PORT || 3000;

connect("mongodb+srv://test:test@cluster1.j5cwa87.mongodb.net/usuario?retryWrites=true&w=majority", {
//connect("mongodb://mongo:Gov2RPqPBa3P05QTtH5E@containers-us-west-172.railway.app:5805", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => {
  console.log('Connection to MongoDB server established');
}).catch(error => {
  console.log(error);
});



const server = app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

module.exports = server;