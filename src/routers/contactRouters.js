import express from 'express';
import {
  addContactController,
  deleteContactController,
  getContactsByIdController,
  getContactsController,
  updateContactByIdController,
} from '../controllers/contacts.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import isValidId from '../middlewares/isValidId.js';

const contactsRouter = express.Router();

contactsRouter.get('/', ctrlWrapper(getContactsController));
contactsRouter.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(getContactsByIdController),
);
contactsRouter.post('/', ctrlWrapper(addContactController));

contactsRouter.patch(
  '/:contactId',
  isValidId,
  ctrlWrapper(updateContactByIdController),
);

contactsRouter.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(deleteContactController),
);

export default contactsRouter;
