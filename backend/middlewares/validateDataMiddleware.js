import Joi from "joi";

const validateDataMiddleware = (schema) => {
  return (req, res, next) => {
    const { value, error } = schema.validate({
      body: req.body,
      params: req.params,
    });
    const isValid = error == null;

    if (isValid) {
      res.locals.validData = value;
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");

      console.log(`Data validation error (url: ${req.url}): ${message}`);
      return res.status(422).json({ error: message });
    }
  };
};

export default validateDataMiddleware;
