import Joi from "joi";


 
const fav = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};







export default {
  fav
};
