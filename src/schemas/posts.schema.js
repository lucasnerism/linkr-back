import joi from "joi";

export const postSchema = joi.object({
  user_id: joi.number().integer().required(),
  link: joi.string().uri().required(),
  comment: joi.string().required()
});