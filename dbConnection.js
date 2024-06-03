import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('cars', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

export default async function auth() {
  try {
    await sequelize.authenticate();
    console.log('Conexão estabelecida com o banco de dados.');
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error);
  }
}
