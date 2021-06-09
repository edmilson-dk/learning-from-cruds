import { DataTypes, Model } from "sequelize";

import db from "src/drivers/database/sequelize";
import { AddUserDto, StoredUserDto } from "src/dtos/user";
import BookModel from "../book";

class UserModel extends Model<StoredUserDto, AddUserDto> {};

UserModel.init({
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
});

UserModel.hasMany(BookModel, {
  sourceKey: "id",
  foreignKey: "user_id",
  as: "books",
});

export = UserModel;