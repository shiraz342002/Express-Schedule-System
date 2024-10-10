import Joi from "joi";

const register = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    repeat_password: Joi.ref("password"),
    zipcode:Joi.number().required(),
    role: Joi.string().required()
  }),
};
 
const id = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

const email = {
  params: Joi.object().keys({
    id: Joi.string().email().required(),
  }),
};

const update = {
 
  body: Joi.object().keys({
    name: Joi.string(),
    email: Joi.string().email(),
    zipcode:Joi.number(),
    // role: Joi.string()
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

export default {
  register,
  login,
  id,
  update,
  email,
};
