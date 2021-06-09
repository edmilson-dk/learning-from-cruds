import { Model, DataTypes } from "sequelize/types";

import db from "src/drivers/database/sequelize";
import { AddBookDto, StoredBookDto } from "src/dtos/book";

class BookModel extends Model<StoredBookDto, AddBookDto> {};

BookModel.init({
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  user_id: {
    allowNull: false,
    type: DataTypes.UUID,
  },
  title:{ 
    allowNull: false,
    type: DataTypes.STRING,
  },
  author:{ 
    allowNull: false,
    type: DataTypes.STRING,
  },
  released:{ 
    allowNull: false,
    type: DataTypes.STRING,
  },
  pages_total: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  image_name:{ 
    allowNull: false,
    type: DataTypes.STRING,
  },
  likes: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  dislikes: {
    allowNull: false,
    type: DataTypes.INTEGER,
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
  tableName: "books",
});

export = BookModel;