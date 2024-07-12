import {
  addContact,
  deleteContact,
  getContacts,
  getContactsByFilter,
  updateContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import parsePaginationParams from '../utils/parsePaginationParams.js';
import parseSortParams from '../utils/parseSortParams.js';
import { contactsFieldList } from '../constants/constants.js';
import parseContactsFilter from '../utils/parseContactsFilter.js';

export const getContactsController = async (req, res) => {
  const { _id: userId } = req.user;
  const { query } = req;
  //console.log(req.query); усі параметри запиту
  const { page, perPage } = parsePaginationParams(query);
  const { sortBy, sortOrder } = parseSortParams(query, contactsFieldList);
  const filter = { ...parseContactsFilter(query), userId };

  const data = await getContacts({ page, perPage, sortBy, sortOrder, filter });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactsByIdController = async (req, res) => {
  const { _id: userId } = req.user;
  const { contactId } = req.params;
  const contactById = await getContactsByFilter({ _id: contactId, userId });

  if (!contactById) {
    throw createHttpError(404, 'Sorry, not found contact ');
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contactById,
  });
};

export const addContactController = async (req, res) => {
  const { _id: userId } = req.user;
  const newContact = await addContact({ ...req.body, userId });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};

export const updateContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const updateContactInfo = await updateContact(contactId, {
    ...req.body,
    userId,
  });
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
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const contact = await deleteContact(contactId, userId); // Передаємо contactId і userId
  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  res.status(204).send();
};
