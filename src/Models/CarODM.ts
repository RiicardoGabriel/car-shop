import { isValidObjectId, Model, Schema, model, models } from 'mongoose';
import ICar from '../Interfaces/ICar';

class CarODM {
  private schema: Schema;
  private model: Model<ICar>;
  
  constructor() {
    this.schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: false },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    });
    this.model = models.Car || model('Car', this.schema);
  }
  
  public async create(car: ICar): Promise<ICar> {
    return this.model.create({ ...car });
  }

  public async find(): Promise<ICar[]> {
    return this.model.find();
  }

  public async findById(_id: string): Promise<ICar | null> {
    if (!isValidObjectId(_id)) throw Error('Invalid Mongo id');
    return this.model.findById(_id);
  }

  public async update(_id: string, car: ICar): Promise<ICar | null> {
    console.log(!isValidObjectId(_id));
    // if (!isValidObjectId(_id)) throw Error('Invalid Mongo id');
    return this.model.findByIdAndUpdate(
      { _id },
      { ...car },
      { new: true },
    );
  }
}
  
export default CarODM;