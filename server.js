import e, { Router } from 'express';
import carRoutes from './routes/carRoutes.js';
import helmet from 'helmet';
import dbConnection from './dbConnection.js';
import { Car } from './models/Car.js';

const app = e();
const port = 3000;
const router = Router();

app.use(helmet());
app.use(e.json());
app.use(e.urlencoded({ extended: true }));
app.use(e.static('./public'));

// Conexão com o banco de dados
dbConnection();
Car.sync({ force: true });

app.use('/', carRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
