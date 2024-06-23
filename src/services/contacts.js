import { Contact } from '../db/shemaContacts.js';

export const getContacts = async () => {
  const data = await Contact.find();
  return data;
};

export const getContactsById = async (id) => {
  const contact = await Contact.findById(id);
  return contact;
};
