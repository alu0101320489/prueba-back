import * as express from 'express';
import { Usuario } from '../../models/usuario';

export const postDamageRouter = express.Router();

const jwt = require('jsonwebtoken');

//Router para calcular el daño de un movimiento
postDamageRouter.post('/damage', async (req, res) => {

  let calculadora = new CalculatorComponent;
  try {

    if ((req.body.tipo1A!=undefined) && (req.body.tipo2A!=undefined)&&(req.body.tipo1D!=undefined) && (req.body.tipo2D!=undefined)&&(req.body.power!=undefined) && (req.body.moveType!=undefined)&&(req.body.statsA!=undefined) && (req.body.statsD!=undefined)&& (req.body.cat!=undefined)) {
      calculadora.tipo1A=req.body.tipo1A;
      calculadora.tipo2A=req.body.tipo2A;
      calculadora.tipo1D=req.body.tipo1D;
      calculadora.tipo2D=req.body.tipo2D;
      calculadora.power=req.body.power;
      calculadora.moveType=req.body.moveType;
      calculadora.statsA=req.body.statsA;
      calculadora.statsD=req.body.statsD;
      calculadora.cat=req.body.cat;
      calculadora.dealDamage = 0;

      calculadora.damage();
      return res.status(200).json({damage: calculadora.dealDamage});
    }
    return res.status(404).json({ msg: "Error de pokemon"});
  } catch (error) {
    return res.status(500).json({ msg: "Error"});
  }
});

export enum Types {
  steel = 0,
  water = 1,
  bug = 2,
  dragon = 3,
  electric = 4,
  ghost = 5,
  fire = 6,
  fairy = 7,
  ice = 8,
  fighting = 9,
  normal = 10,
  grass = 11,
  psychic = 12,
  rock = 13,
  dark = 14,
  ground = 15,
  poison = 16,
  flying = 17
}
export class CalculatorComponent {

  statsA = [];
  tipo1A = "";
  tipo2A = "";

  statsD = [];
  tipo1D = "";
  tipo2D = "";

  url = null;
  moveName = "";
  power = 0;
  moveType = "";
  cat = "";
  dealDamage = 0;

  damage () {

    if (this.cat === "physical") {
        this.dealDamage = 10 * this.stab(this.tipo1A, this.tipo2A, this.moveType) * 
                    this.efectividad(this.moveType, this.tipo1D) * this.efectividad(this.moveType, this.tipo2D) *
                    (((0.2 * this.statsA[1] + 1)* this.power)/(25 * this.statsD[2]) + 2) ;
    } else {
        this.dealDamage = 10 * this.stab(this.tipo1A, this.tipo2A, this.moveType) * 
                    this.efectividad(this.moveType, this.tipo1D) * this.efectividad(this.moveType, this.tipo2D) *
                    (((0.2 * this.statsA[3] + 1)* this.power)/(25 * this.statsD[4]) + 2) ;
    }
  }

  stab(t1 : string, t2 : string, tm : string) {
    if (t1 === tm || t2 === tm) {
        return 1.5;
    } else {
        return 1;
    }
  }

  efectividad(firstPokeType : string, secondPokeType : string) {
    let multiplicador = 1;
    switch (firstPokeType) {
      case Types[0]:
        if (secondPokeType === Types[0] || secondPokeType === Types[1] ||
          secondPokeType === Types[4] || secondPokeType === Types[6]) {
          multiplicador = 1/2;
        } else if (secondPokeType === Types[7] || secondPokeType === Types[8] ||
          secondPokeType === Types[13]) multiplicador = 2;
        break;

      case Types[1]:
        if (secondPokeType === Types[1] || secondPokeType === Types[3] ||
          secondPokeType === Types[11]) multiplicador = 1/2;
        else if (secondPokeType === Types[6] || secondPokeType === Types[13] ||
          secondPokeType === Types[15]) multiplicador = 2;
        break;

      case Types[2]:
        if (secondPokeType === Types[0] || secondPokeType === Types[5] ||
          secondPokeType === Types[6] || secondPokeType === Types[7] ||
          secondPokeType === Types[9] || secondPokeType === Types[16] ||
          secondPokeType === Types[17]) multiplicador = 1/2;
        else if (secondPokeType === Types[11] || secondPokeType === Types[12] ||
          secondPokeType === Types[14]) multiplicador = 2;
        break;

      case Types[3]:
        if (secondPokeType === Types[0]) multiplicador = 1/2;
        else if (secondPokeType === Types[3]) multiplicador = 2;
        else if (secondPokeType === Types[7]) multiplicador = 0;
        break;

      case Types[4]:
        if (secondPokeType === Types[3] || secondPokeType === Types[4] ||
          secondPokeType === Types[11]) multiplicador = 1/2;
        else if (secondPokeType === Types[1] || secondPokeType === Types[17]) {
          multiplicador = 2;
        } else if (secondPokeType === Types[15]) multiplicador = 0;
        break;

      case Types[5]:
        if (secondPokeType === Types[14]) multiplicador = 1/2;
        else if (secondPokeType === Types[5] || secondPokeType === Types[12]) {
          multiplicador = 2;
        } else if (secondPokeType === Types[10]) multiplicador = 0;
        break;

      case Types[6]:
        if (secondPokeType === Types[1] || secondPokeType === Types[3] ||
          secondPokeType === Types[6] || secondPokeType === Types[13]) {
          multiplicador = 1/2;
        } else if (secondPokeType === Types[0] || secondPokeType === Types[2] ||
          secondPokeType === Types[8] || secondPokeType === Types[11]) {
          multiplicador = 2;
        }
        break;

      case Types[7]:
        if (secondPokeType === Types[0] || secondPokeType === Types[6] ||
          secondPokeType === Types[16]) multiplicador = 1/2;
        else if (secondPokeType === Types[3] || secondPokeType === Types[9] ||
          secondPokeType === Types[14]) multiplicador = 2;
        break;

      case Types[8]:
        if (secondPokeType === Types[0] || secondPokeType === Types[1] ||
          secondPokeType === Types[6] || secondPokeType === Types[8]) {
          multiplicador = 1/2;
        } else if (secondPokeType === Types[3] || secondPokeType ===Types[11] ||
          secondPokeType === Types[15] || secondPokeType === Types[17]) {
          multiplicador = 2;
        }
        break;

      case Types[9]:
        if (secondPokeType === Types[2] || secondPokeType === Types[7] ||
          secondPokeType === Types[12] || secondPokeType === Types[16] ||
          secondPokeType === Types[17]) multiplicador = 1/2;
        else if (secondPokeType === Types[0] || secondPokeType === Types[8] ||
          secondPokeType === Types[10] || secondPokeType === Types[13] ||
          secondPokeType === Types[14]) multiplicador = 2;
        else if (secondPokeType === Types[5]) multiplicador = 0;
        break;

      case Types[10]:
        if (secondPokeType === Types[0] || secondPokeType === Types[13]) {
          multiplicador = 1/2;
        } else if (secondPokeType === Types[5]) multiplicador = 0;
        break;

      case Types[11]:
        if (secondPokeType === Types[0] || secondPokeType === Types[2] ||
          secondPokeType === Types[3] || secondPokeType === Types[6] ||
          secondPokeType === Types[11] || secondPokeType === Types[16] ||
          secondPokeType === Types[17]) multiplicador = 1/2;
        else if (secondPokeType === Types[1] || secondPokeType === Types[13] ||
          secondPokeType === Types[15]) multiplicador = 2;
        break;

      case Types[12]:
        if (secondPokeType === Types[0] || secondPokeType === Types[12]) {
          multiplicador = 1/2;
        } else if (secondPokeType === Types[9] || secondPokeType ===Types[16]) {
          multiplicador = 2;
        } else if (secondPokeType === Types[14]) multiplicador = 0;
        break;

      case Types[13]:
        if (secondPokeType === Types[0] || secondPokeType === Types[9] ||
          secondPokeType === Types[15]) multiplicador = 1/2;
        else if (secondPokeType === Types[2] || secondPokeType === Types[6] ||
          secondPokeType === Types[8] || secondPokeType === Types[17]) {
          multiplicador = 2;
        }
        break;

      case Types[14]:
        if (secondPokeType === Types[7] || secondPokeType === Types[9] ||
          secondPokeType === Types[14]) multiplicador = 1/2;
        else if (secondPokeType === Types[5] || secondPokeType === Types[12]) {
          multiplicador = 2;
        }
        break;

      case Types[15]:
        if (secondPokeType === Types[2] || secondPokeType === Types[11]) {
          multiplicador = 1/2;
        } else if (secondPokeType === Types[0] || secondPokeType === Types[4] ||
          secondPokeType === Types[6] || secondPokeType === Types[13] ||
          secondPokeType === Types[16]) multiplicador = 2;
        else if (secondPokeType === Types[17]) multiplicador = 0;
        break;

      case Types[16]:
        if (secondPokeType === Types[5] || secondPokeType === Types[13] ||
          secondPokeType === Types[15] || secondPokeType === Types[16]) {
          multiplicador = 1/2;
        } else if (secondPokeType === Types[7] || secondPokeType ===Types[11]) {
          multiplicador = 2;
        } else if (secondPokeType === Types[0]) multiplicador = 0;
        break;

      case Types[17]:
        if (secondPokeType === Types[0] || secondPokeType === Types[4] ||
          secondPokeType === Types[13]) multiplicador = 1/2;
        else if (secondPokeType === Types[2] || secondPokeType === Types[9] ||
          secondPokeType === Types[11]) multiplicador = 2;
        break;
    }
    return multiplicador;
  }
}