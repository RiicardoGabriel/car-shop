import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import Car from '../../../src/Domains/Car';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';

describe('Deveria cadastrar um carro', function () {
  it('Deveria cadastrar um carro com SUCESSO', async function () {
    const inputCar: ICar = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };
    
    const outputCar: Car = new Car({
      id: '63c7edcae382c0d1d58561b3',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    });
    sinon.stub(Model, 'create').resolves(outputCar);

    const service = new CarService();
    const result = await service.newCar(inputCar);

    expect(result).to.be.deep.equal(outputCar);
    sinon.restore();
  });

  it('Verifica se é possível encontrar um carro pelo id', async function () {
    const output: ICar = {
      id: '63319d80feb9f483ee823ac5',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };
    const carOutput: Car = new Car(output);
    sinon.stub(Model, 'findById').resolves(output);

    const service = new CarService();
    const result = await service.getCarById('63319d80feb9f483ee823ac5');

    expect(result).to.be.deep.equal(carOutput);
    sinon.restore();
  });
});