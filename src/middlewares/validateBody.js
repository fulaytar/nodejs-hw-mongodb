import createHttpError from 'http-errors';

const validateBody = (schema) => {
  const func = async (req, res, next) => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (err) {
      const error = createHttpError(400, err.message, {
        errors: err.details,
      });
      next(error);
    }
  };
  return func;
};

export default validateBody;
