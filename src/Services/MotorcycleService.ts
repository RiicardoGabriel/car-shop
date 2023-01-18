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
    const carModel = new MotorcycleODM();
    const result = await carModel.create({ ...obj, status: obj.status || false });
    return this.newMotorcycleDomain(result);
  };
}

export default MotorcycleService;