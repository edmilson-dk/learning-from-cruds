import { Model, DataTypes } from "sequelize/types";

import db from "src/drivers/database/sequelize";
import { AddBookDto, BookAtributtes } from "src/dtos/book";

export class BookInstance extends Model<BookAtributtes, AddBookDto> {};

BookInstance.init({
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
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