import { Request, Response, NextFunction } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';

export default class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  public async create() {
    const motorcycle: IMotorcycle = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };

    try {
      const newMotorcycle = await this.service.newMotorcycle(motorcycle);
      return this.res.status(201).json(newMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  public async getMotorcycle() {
    try {
      const result = await this.service.getMotorcycle();
      return this.res.status(200).json(result);
    } catch (error) {
      return this.next;
    }
  }

  public async getMotorcycleById() {
    const { id } = this.req.params;
    try {
      const carId = await this.service.getMotorcycleById(id);
      if (!carId) { return this.res.status(404).json({ message: 'Motorcycle not found' }); }
      return this.res.status(200).json(carId);
    } catch (error) {
      return this.res.status(422).json({ message: 'Invalid mongo id' });
    }
  }
}