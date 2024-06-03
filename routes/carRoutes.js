import { Router } from 'express';
import { Car } from '../models/Car.js';
const router = Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const carId = Number(id);

  if (isNaN(carId))
    return res.status(400).json({ error: 'Formato de id inválido' });

  try {
    const car = await Car.findByPk(carId);

    if (!car) {
      res.status(404).json({ error: 'Carro não encontrado' });
    }

    res.status(200).json(car);
  } catch (error) {}
});

router.get('/', async (req, res) => {
  try {
    const cars = await Car.findAll({
      order: [['valor', 'DESC']],
    });

    res.status(200).json(cars);
  } catch (err) {
    console.log(err);
    res.status(501).json({ error: 'Erro de busca no banco de dados' });
  }
});

router.post('/', async (req, res) => {
  const { nome, marca, modelo, valor } = req.body;

  try {
    const newCar = await Car.create({ nome, marca, modelo, valor });
    res.status(201).json({ newCar });
  } catch (error) {
    res.status(501).json({ error: 'Erro de inserção no banco de dados' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, marca, modelo, valor } = req.body;

  try {
    const car = await Car.findByPk(id);

    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }

    car.nome = nome;
    car.marca = marca;
    car.modelo = modelo;
    car.valor = valor;

    await car.save();

    res.json(car);
  } catch (err) {
    res.status(501).json({ error: 'Erro de atualização no banco de dados' });
  }
});

export default router;
