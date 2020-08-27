import Joi from "react-native-joi";

const nameSchema = Joi.object().keys({
  name: Joi.string()
    .min(5)
    .max(30)
    .required(),
});

const emailSchema = Joi.object().keys({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
});

const numberSchema = Joi.object().keys({
  number: Joi.string()
  .regex(/^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i)
    .min(5)
    .max(30)
    .required(),
});

const addressSchema = Joi.object().keys({
  address: Joi.string().min(5).max(50).required(),
});

const schoolNameSchema = Joi.object().keys({
  schoolName: Joi.string().min(3).max(40).required(),
});

const dateSchema = Joi.object().keys({
  startYear: Joi.string().min(4).max(30).required(),
  endYear: Joi.string().min(4).max(30).required(),
});

const genderSchema = Joi.object().keys({
  gender: Joi.string().min(4).max(30).required(),
});

export {
  nameSchema,
  emailSchema,
  numberSchema,
  addressSchema,
  dateSchema,
  genderSchema,
  schoolNameSchema,
};
