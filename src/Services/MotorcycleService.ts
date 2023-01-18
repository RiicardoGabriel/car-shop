import IMotorcycle from '../Interfaces/IMotorcycle';
import Motorcycle from '../Domains/Motorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

class MotorcycleService {
  private newMotorcycleDomain(motorcycle: IMotorcycle | null): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }
    return null;
  }

  public newMotorcycle = async (obj: IMotorcycle) => {
    const motocycleModel = new MotorcycleODM();
    const result = await motocycleModel.create({ ...obj, status: obj.status || false });
    return this.newMotorcycleDomain(result);
  };

  public getMotorcycle = async () => {
    const motocycleModel = new MotorcycleODM();
    const find = await motocycleModel.find();
    const result = find.map((curr) => this.newMotorcycleDomain(curr));
    return result;
  };

  public getMotorcycleById = async (id: string) => {
    const motocycleModel = new MotorcycleODM();
    const result = await motocycleModel.findById(id);
    return this.newMotorcycleDomain(result);
  };
}

export default MotorcycleService;