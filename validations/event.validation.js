import Joi from "joi";

const add = {
  body: Joi.object().keys({
    // image: Joi.string().required(),
    event_name: Joi.string().required(),
    category: Joi.string().required(),
    date: Joi.date().iso().required(),
    start_time: Joi.string().required(),
    end_time: Joi.string().required(),
    description: Joi.string().required(),
    videolink: Joi.string().required(), // Optional and can be empty or null
    socialpagelink: Joi.string().required(), // Optional and can be empty or null
    location: Joi.object({
      coordinates: Joi.array().items(Joi.number().min(-180).max(180)),
    }),
    fee: Joi.number().required(),
    liability: Joi.string().required(),
    country: Joi.string().required(),
    state: Joi.string().required(),
  }),
};

export default {
  add,
};
