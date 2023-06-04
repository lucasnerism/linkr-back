import joi from "joi";

export const postSchema = joi.object({
  link: joi.string().uri().required(),
  comment: joi.string().required()
});