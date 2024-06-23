import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    return next(createHttpError(400, 'Sorry, id is not valid'));
  }
  next();
};

export default isValidId;
