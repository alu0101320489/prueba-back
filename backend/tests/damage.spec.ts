import 'mocha';

const chai = require('chai');
const chaiHttp = require('chai-http');
import {Types} from '../src/routers/usuarioRouters/postDamage'
import {CalculatorComponent} from '../src/routers/usuarioRouters/postDamage'

chai.use(chaiHttp);
const expect = chai.expect;



describe('CalculatorComponent.damage()', () => {
    let calculator;
    beforeEach(() => {
        calculator = new CalculatorComponent();
    });

    it('should calculate the damage dealt by a physical move correctly', () => {
        calculator.cat = "physical";
        calculator.statsA = [1,100,100,100,100];
        calculator.tipo1A = Types[1];
        calculator.statsD = [1,100,100,100,100];
        calculator.tipo1D = Types[6];
        calculator.power = 50;
        calculator.moveType = Types[1];
        calculator.damage();
        expect(calculator.dealDamage).to.equal(72.6);
    });

    it('should calculate the damage dealt by a special move correctly', () => {
        calculator.cat = "special";
        calculator.statsA = [1,100,100,100,100];
        calculator.tipo1A = Types[1];
        calculator.statsD = [1,100,100,100,100];
        calculator.tipo1D = Types[6];
        calculator.power = 50;
        calculator.moveType = Types[1];
        calculator.damage();
        expect(calculator.dealDamage).to.equal(72.6);
    });
});

describe('CalculatorComponent.stab()', () => {
    let calculator;
    beforeEach(() => {
        calculator = new CalculatorComponent();
    });

    it('should return 1.5 if the move type is the same as either of the attacking Pokemon\'s types', () => {
        calculator.tipo1A = Types[1];
        calculator.tipo2A = Types[4];
        expect(calculator.stab(calculator.tipo1A, calculator.tipo2A, Types[1])).to.equal(1.5);
        expect(calculator.stab(calculator.tipo1A, calculator.tipo2A, Types[4])).to.equal(1.5);
    });

    it('should return 1 if the move type is different from both of the attacking Pokemon\'s types', () => {
        calculator.tipo1A = Types[1];
        calculator.tipo2A = Types[4];
        expect(calculator.stab(calculator.tipo1A, calculator.tipo2A, Types[0])).to.equal(1);
    });
});

describe('CalculatorComponent.efectividad()', () => {
    let calculator;
    beforeEach(() => {
        calculator = new CalculatorComponent();
    });

    it('should return the correct multiplier based on the types of the attacking and defending Pokemon', () => {
        calculator.tipo1A = Types[0];
        expect(calculator.efectividad(calculator.tipo1A, Types[0])).to.equal(1/2);
        expect(calculator.efectividad(calculator.tipo1A, Types[7])).to.equal(2);
        calculator.tipo1A = Types[1];
        expect(calculator.efectividad(calculator.tipo1A, Types[1])).to.equal(1/2);
        expect(calculator.efectividad(calculator.tipo1A, Types[6])).to.equal(2);
        calculator.tipo1A = Types[2];
        expect(calculator.efectividad(calculator.tipo1A, Types[0])).to.equal(1/2);
        expect(calculator.efectividad(calculator.tipo1A, Types[11])).to.equal(2);
        calculator.tipo1A = Types[3];
        expect(calculator.efectividad(calculator.tipo1A, Types[0])).to.equal(1/2);
        expect(calculator.efectividad(calculator.tipo1A, Types[3])).to.equal(2);
        expect(calculator.efectividad(calculator.tipo1A, Types[7])).to.equal(0);
        calculator.tipo1A = Types[4];
        expect(calculator.efectividad(calculator.tipo1A, Types[3])).to.equal(1/2);
        expect(calculator.efectividad(calculator.tipo1A, Types[1])).to.equal(2);
        expect(calculator.efectividad(calculator.tipo1A, Types[15])).to.equal(0);
        calculator.tipo1A = Types[5];
        expect(calculator.efectividad(calculator.tipo1A, Types[14])).to.equal(1/2);
        expect(calculator.efectividad(calculator.tipo1A, Types[5])).to.equal(2);
        expect(calculator.efectividad(calculator.tipo1A, Types[10])).to.equal(0);
        calculator.tipo1A = Types[6];
        expect(calculator.efectividad(calculator.tipo1A, Types[1])).to.equal(1/2);
        expect(calculator.efectividad(calculator.tipo1A, Types[8])).to.equal(2);
        calculator.tipo1A = Types[7];
        expect(calculator.efectividad(calculator.tipo1A, Types[0])).to.equal(1/2);
        expect(calculator.efectividad(calculator.tipo1A, Types[3])).to.equal(2);
        calculator.tipo1A = Types[8];
        expect(calculator.efectividad(calculator.tipo1A, Types[0])).to.equal(1/2);
        expect(calculator.efectividad(calculator.tipo1A, Types[3])).to.equal(2);
        calculator.tipo1A = Types[9];
        expect(calculator.efectividad(calculator.tipo1A, Types[12])).to.equal(1/2);
        expect(calculator.efectividad(calculator.tipo1A, Types[0])).to.equal(2);
        expect(calculator.efectividad(calculator.tipo1A, Types[5])).to.equal(0);
        calculator.tipo1A = Types[10];
        expect(calculator.efectividad(calculator.tipo1A, Types[0])).to.equal(1/2);
        expect(calculator.efectividad(calculator.tipo1A, Types[5])).to.equal(0);
        calculator.tipo1A = Types[11];
        expect(calculator.efectividad(calculator.tipo1A, Types[0])).to.equal(1/2);
        expect(calculator.efectividad(calculator.tipo1A, Types[1])).to.equal(2);
        calculator.tipo1A = Types[12];
        expect(calculator.efectividad(calculator.tipo1A, Types[0])).to.equal(1/2);
        expect(calculator.efectividad(calculator.tipo1A, Types[9])).to.equal(2);
        expect(calculator.efectividad(calculator.tipo1A, Types[14])).to.equal(0);
        calculator.tipo1A = Types[13];
        expect(calculator.efectividad(calculator.tipo1A, Types[0])).to.equal(1/2);
        expect(calculator.efectividad(calculator.tipo1A, Types[2])).to.equal(2);
        calculator.tipo1A = Types[14];
        expect(calculator.efectividad(calculator.tipo1A, Types[7])).to.equal(1/2);
        expect(calculator.efectividad(calculator.tipo1A, Types[5])).to.equal(2);
        calculator.tipo1A = Types[15];
        expect(calculator.efectividad(calculator.tipo1A, Types[2])).to.equal(1/2);
        expect(calculator.efectividad(calculator.tipo1A, Types[0])).to.equal(2);
        expect(calculator.efectividad(calculator.tipo1A, Types[17])).to.equal(0);
        calculator.tipo1A = Types[16];
        expect(calculator.efectividad(calculator.tipo1A, Types[5])).to.equal(1/2);
        expect(calculator.efectividad(calculator.tipo1A, Types[7])).to.equal(2);
        expect(calculator.efectividad(calculator.tipo1A, Types[0])).to.equal(0);
        calculator.tipo1A = Types[17];
        expect(calculator.efectividad(calculator.tipo1A, Types[0])).to.equal(1/2);
        expect(calculator.efectividad(calculator.tipo1A, Types[11])).to.equal(2);
    });
});