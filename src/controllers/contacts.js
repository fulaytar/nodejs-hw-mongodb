import mongoose from 'mongoose';
import { getContacts, getContactsById } from '../services/contacts.js';

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
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: 'Sorry, id is not valid ',
    });
  }
  const contactById = await getContactsById(id);

  if (!contactById) {
    return res.status(404).json({
      status: 404,
      message: 'Sorry, not found contact ',
    });
  }
  res.json({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    data: contactById,
  });
};
