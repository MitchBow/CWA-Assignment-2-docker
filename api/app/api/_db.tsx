import { Sequelize, DataTypes, Model } from 'sequelize';
import path from 'path';
import sqlite3 from 'sqlite3';

// ✅ Connect to SQLite via Sequelize
export const sequelize = new Sequelize({
  dialect: 'sqlite',
  dialectModule: sqlite3,
  storage: path.resolve('./sqlite/dev.sqlite'),
  logging: false,
});

// ✅ User model
export const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// ✅ Stage model
export const Stage = sequelize.define('Stage', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  stageData: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

// ✅ Relationships
User.hasMany(Stage, { foreignKey: 'userId' });
Stage.belongsTo(User, { foreignKey: 'userId' });

// ✅ Initialize tables
export async function initDB() {
  await sequelize.sync({ alter: true });
}
