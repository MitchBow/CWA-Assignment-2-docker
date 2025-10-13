import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import path from 'path';
import sqlite3 from 'sqlite3';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  dialectModule: sqlite3,
  storage: path.resolve('./sqlite/dev.sqlite'), // make sure this path is writable
  logging: false,
});

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare username: string;
  declare password: string;
  declare stageProgress: CreationOptional<string | null>;
}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    stageProgress: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    sequelize,
    modelName: 'User',
    timestamps: false,
  }
);

// ✅ Sync database on import
(async () => {
  try {
    await sequelize.sync({ alter: true }); // creates table if missing
    console.log('✅ Database synced!');
  } catch (err) {
    console.error('❌ Failed to sync database:', err);
  }
})();
