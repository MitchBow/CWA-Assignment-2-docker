import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import path from 'path';

// Dynamically import sqlite3 to prevent bundling issues
import sqlite3 from 'sqlite3';

// SQLite setup with explicitly defined dialectModule
export const sequelize = new Sequelize({
  dialect: 'sqlite',
  dialectModule: sqlite3,
  storage: path.resolve('./sqlite/dev.sqlite'), // make sure this path is writable
  logging: false,
});

// Typed Sequelize User model
export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare lineStatus: 'online' | 'offline';
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lineStatus: {
      type: DataTypes.ENUM('online', 'offline'),
      allowNull: false,
    },
    // ✅ Optionally declare these to satisfy TypeScript
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'User',
    timestamps: true,
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
