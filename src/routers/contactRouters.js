import express from 'express';
import {
  getContactsByIdController,
  getContactsController,
} from '../controllers/contacts.js';

const contactsRouter = express.Router();

contactsRouter.get('/', getContactsController);
contactsRouter.get('/:contactId', getContactsByIdController);

/* app.get('/contacts', getContacts);
app.get('/contacts/:contactId', getContactsById); */

export default contactsRouter;
