import { DataTypes } from 'sequelize';
import { sequelize } from '../../configs/db.js';
import { generateUserId } from '../../helpers/uuid-generator.js';

export const User = sequelize.define(
  'User',
  {
    Id: {
      type: DataTypes.STRING(16),
      primaryKey: true,
      field: 'id',
      defaultValue: () => generateUserId(),
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    contraseña: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    timestamps: true,
  }
);
