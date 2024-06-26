
import {
  addContact,
  deleteContact,
  getContacts,
  getContactsById,
  updateContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';

export const getContactsController = async (req, res) => {
  const data = await getContacts();
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactsByIdController = async (req, res) => {
  const id = req.params.contactId;
  const contactById = await getContactsById(id);

  if (!contactById) {
    throw createHttpError(404, 'Sorry, not found contact ');
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    data: contactById,
  });
};

export const addContactController = async (req, res) => {
  const newContact = await addContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};

export const updateContactByIdController = async (req, res, next) => {
  const contactId = req.params.contactId;
  const updateContactInfo = await updateContact(contactId, req.body);
  if (!updateContactInfo) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: updateContactInfo.contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const contactId = req.params.contactId;
  const contact = await deleteContact(contactId);
   if (!contact) {
     next(createHttpError(404, 'Contact not found'));
     return;
   }
   res.status(204).send();
};
