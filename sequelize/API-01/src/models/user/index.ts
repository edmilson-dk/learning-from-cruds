import { DataTypes, Model } from "sequelize";

import db from "src/drivers/database/sequelize";
import { AddUserDto, StoredUserDto } from "src/domain/dtos/user";
import { Book } from "../book";

export class User extends Model<StoredUserDto, AddUserDto> {};

User.init({
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  name: { 
    allowNull: false,
    type: DataTypes.STRING,
  },
  email: { 
    allowNull: false,
    type: DataTypes.STRING,
  },
  password: { 
    allowNull: false,
    type: DataTypes.STRING,
  },
  avatar: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  bio: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  created_at: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: new Date(),
  },
  updated_at: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: new Date(),
  }
}, {
  sequelize: db.sequelize,
  tableName: "users",
})

User.hasMany(Book, {
  sourceKey: "id",
  foreignKey: "user_id",
  as: "books",
});