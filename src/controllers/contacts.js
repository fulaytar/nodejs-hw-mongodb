import mongoose from 'mongoose';
import { getContacts, getContactsById } from '../services/contacts.js';
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
