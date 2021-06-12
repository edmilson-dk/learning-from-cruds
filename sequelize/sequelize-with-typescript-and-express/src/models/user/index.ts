import { DataTypes, Model } from "sequelize";

import db from "src/drivers/database/sequelize";
import { AddUserDto, StoredUserDto } from "src/domain/dtos/user";
import { Book } from "../book";

class UserModel extends Model<StoredUserDto, AddUserDto> {};

export const User = db.sequelize.define<UserModel, AddUserDto>('users', {
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
  }
});

User.hasMany(Book, {
  sourceKey: "id",
  foreignKey: "user_id",
  as: "books",
});