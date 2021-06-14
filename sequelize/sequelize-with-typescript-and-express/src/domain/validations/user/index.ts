import Joi from "joi";

type RegisterUserData = {
  name: string;
  email: string;
  password: string;
  bio: string;
}

type LoginUserData = {
  password: string;
  email: string;
}

export function isInvalidRegisterUserData({ name, email, password, bio }: RegisterUserData) {
  const schema = Joi.object<RegisterUserData>({
    name: Joi.string().min(3).max(40).required(),
    email: Joi.string().email().regex(new RegExp( /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/)).required(),
    bio: Joi.string().min(10).max(255).required(),
    password: Joi.string().min(8).max(36)
  });
  
  const result = schema.validate({ name, email, password, bio });

  return result.error ? result.error : false;
}

export function isInvalidLoginUserData({ email, password }: LoginUserData) {
  const schema = Joi.object<RegisterUserData>({
    email: Joi.string().email().regex(new RegExp( /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/)).required(),
    password: Joi.string().min(8).max(36)
  });
  
  const result = schema.validate({ email, password });

  return result.error ? result.error : false;
}