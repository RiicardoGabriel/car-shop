import ICar from '../Interfaces/ICar';
import Car from '../Domains/Car';
import CarODM from '../Models/CarODM';

class CarService {
  private newCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public newCar = async (obj: ICar) => {
    const carModel = new CarODM();
    const result = await carModel.create({ ...obj, status: obj.status || false });
    return this.newCarDomain(result);
  };
  
  public getCars = async () => {
    const carModel = new CarODM();
    const find = await carModel.find();
    const result = find.map((curr) => this.newCarDomain(curr));
    return result;
  };

  public getCarById = async (id: string) => {
    const carModel = new CarODM();
    const result = await carModel.findById(id);
    return this.newCarDomain(result);
  };

  public updateCarById = async (id: string, body: ICar) => {
    const carModel = new CarODM();
    const result = await carModel.update(id, body);
    console.log(result);
    return this.newCarDomain(result);
  };
}

export default CarService;