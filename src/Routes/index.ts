import { Router } from 'express';
import CarController from '../Controllers/CarController';
import MotorcycleController from '../Controllers/MotorcycleController';

const router = Router();

router.get('/cars', (req, res, next) => new CarController(req, res, next).getCars());
router.get('/cars/:id', (req, res, next) => new CarController(req, res, next).getCarById());
router.put('/cars/:id', (req, res, next) => new CarController(req, res, next).updateCarById());
router.post('/cars', (req, res, next) => new CarController(req, res, next).create());
router.post('/motorcycles', (req, res, next) => new MotorcycleController(req, res, next).create());

export default router;