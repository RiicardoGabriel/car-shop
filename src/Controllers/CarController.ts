import { Request, Response, NextFunction } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';

export default class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public async create() {
    const car: ICar = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };

    try {
      const newCar = await this.service.newCar(car);
      return this.res.status(201).json(newCar);
    } catch (error) {
      this.next(error);
    }
  }

  public async getCars() {
    try {
      const result = await this.service.getCars();
      return this.res.status(200).json(result);
    } catch (error) {
      return this.next;
    }
  }

  public async getCarById() {
    const { id } = this.req.params;
    try {
      const carId = await this.service.getCarById(id);
      if (!carId) { return this.res.status(404).json({ message: 'Car not found' }); }
      return this.res.status(200).json(carId);
    } catch (error) {
      return this.res.status(422).json({ message: 'Invalid mongo id' });
    }
  }

  public async updateCarById() {
    const { id } = this.req.params;
    try {
      const carId = await this.service.getCarById(id);
      if (!carId) { return this.res.status(404).json({ message: 'Car not found' }); }
      if (carId) {
        const result = await this.service.updateCarById(id, this.req.body);
        return this.res.status(200).json(result);
      }
    } catch (error) {
      return this.res.status(422).json({ message: 'Invalid mongo id' });
    }
  }
}