import { Router } from 'express';
import CarController from '../Controllers/CarController';

const router = Router();

router.get('/cars', (req, res, next) => new CarController(req, res, next).getCars());
router.get('/cars/:id', (req, res, next) => new CarController(req, res, next).getCarById());
router.post('/cars', (req, res, next) => new CarController(req, res, next).create());

export default router;