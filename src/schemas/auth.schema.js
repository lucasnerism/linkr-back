import joi from "joi";

export const signUpSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(3).required(),
    username: joi.string().required(),
    profile_picture: joi.string().required(),
});

export const signInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(3).required(),
});