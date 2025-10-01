import { sequelize } from '../lib/sequelize';

export async function initDB() {
  await sequelize.sync({ alter: true }); // creates tables if not exist
}
