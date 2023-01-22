"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const usuario_1 = require("../src/models/usuario");
chai.use(chaiHttp);
const expect = chai.expect;
describe('POST /register', () => {
    beforeEach(async () => {
        // Clear the database before each test
        await usuario_1.Usuario.deleteMany({});
    });
    it('should create a new user and return 201 status', async () => {
        const res = await chai.request(app)
            .post('/register')
            .send({
            nombre: "paula",
            contraseña: "8888",
            equipo: ["", "", "", "", "", ""]
        });
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('nombre', 'paula');
        expect(res.body).to.have.property('equipo', '["","","","","",""]');
        expect(res.body).to.not.have.property('contraseña');
    });
    it('should return 400 status if username has a non alphanumeric value', async () => {
        await new usuario_1.Usuario({
            nombre: 'd@ni',
            contraseña: "8888",
            equipo: ["", "", "", "", "", ""]
        }).save();
        const res = await chai.request(app)
            .post('/register')
            .send({
            nombre: 'd@ni',
            contraseña: "8888",
            equipo: ["", "", "", "", "", ""]
        });
        expect(res).to.have.status(400);
    });
});
