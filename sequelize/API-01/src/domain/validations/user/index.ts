import Joi from "joi";
import { AddUserDto } from "src/domain/dtos/user";

type LoginUserData = {
  password: string;
  email: string;
}

export function isInvalidRegisterUserData({ name, email, password, bio }: Omit<AddUserDto, "avatar">) {
  const schema = Joi.object<Omit<AddUserDto, "avatar">>({
    name: Joi.string().min(3).max(40).required(),
    email: Joi.string().email().regex(new RegExp(/^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/)).required(),
    bio: Joi.string().min(10).max(255).required(),
    password: Joi.string().min(8).max(36)
  });
  
  const result = schema.validate({ name, email, password, bio });

  return result.error ? result.error : false;
}

export function isInvalidLoginUserData({ email, password }: LoginUserData) {
  const schema = Joi.object<LoginUserData>({
    email: Joi.string().email().regex(new RegExp( /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/)).required(),
    password: Joi.string().min(8).max(36)
  });
  
  const result = schema.validate({ email, password });

  return result.error ? result.error : false;
}