import Joi from "joi";
import { AddBookDto } from "src/domain/dtos/book";

export function isInvalidBookCreateData(data: AddBookDto) {
  const schema = Joi.object({
    title: Joi.string().min(6).max(80).required(),
    author: Joi.string().min(3).max(36).required(),
    released: Joi.string().required(),
    pages_total: Joi.number().min(0).max(2000),
    likes: Joi.number().min(0),
    dislikes: Joi.number().min(0),
    user_id: Joi.string().min(0), 
    image_name: Joi.string().min(30)
  });

  const result = schema.validate(data);

  return result.error ? result.error : false;
}