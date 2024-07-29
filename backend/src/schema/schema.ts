import Joi from "joi";
const postSchema = Joi.object({
  title: Joi.string(),
  done: Joi.boolean,
});

const reqParamasSchemaId = Joi.object({
  id: Joi.string().id(),
});

const services = Joi.array().items(postSchema);

const responseSchema = Joi.object().keys({
  id: Joi.string(),
  title: Joi.string(),
  done: Joi.boolean,
});

export { postSchema, services, responseSchema, reqParamasSchemaId };
