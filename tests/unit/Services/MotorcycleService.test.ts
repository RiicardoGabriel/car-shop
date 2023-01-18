import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import Motorcycle from '../../../src/Domains/Motorcycle';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';

describe('Deveria cadastrar uma moto', function () {
  it('Deveria cadastrar uma moto com SUCESSO', async function () {
    const inputMotorcycle: IMotorcycle = {
      model: 'Honda Cb 600f Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };
    
    const outputMotorcycle: Motorcycle = new Motorcycle({
      id: '6348513f34c397abcad040b2',
      model: 'Honda Cb 600f Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    });

    sinon.stub(Model, 'create').resolves(outputMotorcycle);

    const service = new MotorcycleService();
    const result = await service.newMotorcycle(inputMotorcycle);

    expect(result).to.be.deep.equal(outputMotorcycle);
    sinon.restore();
  });

  it('Verifica se é possível encontrar uma moto pelo id', async function () {
    const output: IMotorcycle = {
      id: '6348513f34c397abcad040b2',
      model: 'Honda 600f Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };
    const motoOutput: Motorcycle = new Motorcycle(output);
    sinon.stub(Model, 'findById').resolves(output);

    const service = new MotorcycleService();
    const result = await service.getMotorcycleById('6348513f34c397abcad040b2');

    expect(result).to.be.deep.equal(motoOutput);
    sinon.restore();
  });
});