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
import validateBody from '../middlewares/validateBody.js';
import {
  createContactsSchema,
  updateContactSchema,
} from '../validation/contacts_schema.js';
import authenticate from '../middlewares/authenticate.js';
import upload from '../middlewares/upload.js';

const contactsRouter = express.Router();

//тут мідлвара на кожний запит
contactsRouter.use(authenticate);

contactsRouter.get('/', ctrlWrapper(getContactsController));

contactsRouter.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(getContactsByIdController),
);

contactsRouter.post(
  '/',
  validateBody(createContactsSchema),
  ctrlWrapper(addContactController),
);

contactsRouter.patch(
  '/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactByIdController),
);

contactsRouter.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(deleteContactController),
);

export default contactsRouter;
