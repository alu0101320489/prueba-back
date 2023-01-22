"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
//import './db/mongoose';
const postDamage_1 = require("./routers/usuarioRouters/postDamage");
const postUsuario_1 = require("./routers/usuarioRouters/postUsuario");
const patchUsuario_1 = require("./routers/usuarioRouters/patchUsuario");
const default_1 = require("./routers/default");
const app = express_1.default();
const cors = require('cors');
app.use(express_1.default.json());
app.use(cors());
app.use(postUsuario_1.postUsuarioRouter);
app.use(postDamage_1.postDamageRouter);
app.use(patchUsuario_1.patchUsuarioRouter);
app.use(default_1.defaultRouter);
const port = process.env.PORT || 3000;
mongoose_1.connect("mongodb+srv://test:test@cluster1.j5cwa87.mongodb.net/usuario?retryWrites=true&w=majority", {
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
