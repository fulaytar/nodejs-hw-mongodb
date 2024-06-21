import express from 'express';
import { getContacts, getContactsById } from '../services/contacts.js';

const contactsRouter = express.Router();

contactsRouter.get('/', getContacts);
contactsRouter.get('/:contactId', getContactsById);

/* app.get('/contacts', getContacts);
app.get('/contacts/:contactId', getContactsById); */

export default contactsRouter;
