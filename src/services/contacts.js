import mongoose from 'mongoose';
import { Contact } from '../db/shemaContacts.js';

export const getContacts = async (req, res) => {
  try {
    const data = await Contact.find();
    console.log(data);
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: `Ops error: ${error.message}`,
      data: null,
    });
  }
};

export const getContactsById = async (req, res) => {
  const id = req.params.contactId;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: 'Sorry, id is not valid ',
    });
  }
  const contact = await Contact.findById(id);

  if (!contact) {
    return res.status(404).json({
      status: 404,
      message: 'Sorry, not found contact ',
    });
  }
  res.json({
    message: `Successfully found contact with id ${id}!`,
    data: contact,
  });
};
