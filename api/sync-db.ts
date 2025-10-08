// sync-db.ts
import { Sequelize, DataTypes, Model } from 'sequelize';
import path from 'path';
import sqlite3 from 'sqlite3';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  dialectModule: sqlite3,
  storage: path.resolve('./sqlite/dev.sqlite'),
  logging: console.log, // optional for debugging
});

class User extends Model {
  declare id: number;
  declare username: string;
  declare password: string;
  declare stageProgress: string | null;
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

(async () => {
  try {
    await sequelize.sync({ force: true }); // drops & recreates tables
    console.log('Database synced');

    const testUser = await User.create({
      username: 'test',
      password: '1234',
      stageProgress: null,
    });

    console.log('Test user created:', testUser.username);
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await sequelize.close();
  }
})();
