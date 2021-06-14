import Joi from "joi";

type RegisterUserData = {
  name: string;
  email: string;
  password: string;
  bio: string;
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