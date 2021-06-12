import { Model, DataTypes } from "sequelize";

import db from "src/drivers/database/sequelize";
import { AddBookDto, StoredBookDto } from "src/domain/dtos/book";

class BookModel extends Model<StoredBookDto, AddBookDto> {};

export const Book = db.sequelize.define<BookModel, AddBookDto>("books", {
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
  }
});