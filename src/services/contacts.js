import { contactsFieldList, sortOrderList } from '../constants/constants.js';
import { Contact } from '../db/models/shemaContacts.js';
import calcPaginationData from '../utils/calcPaginationData.js';

export const getContacts = async ({
  page = 1,
  perPage,
  sortBy = contactsFieldList[0],
  sortOrder = sortOrderList[0],
}) => {
  const skip = (page - 1) * perPage;
  const data = await Contact.find()
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });
  const totalItems = await Contact.find().countDocuments();
  const { totalPages, hasNextPage, hasPreviousPage } = calcPaginationData({
    total: totalItems,
    page,
    perPage,
  });

  return {
    data,
    page,
    perPage,
    totalItems,
    totalPages,
    hasPreviousPage,
    hasNextPage,
  };
};

export const getContactsById = async (id) => {
  const contact = await Contact.findById(id);
  return contact;
};

export const addContact = async (data) => {
  const contact = await Contact.create(data);
  return contact;
};

export const updateContact = async (contactId, payload, options = {}) => {
  const rawResult = await Contact.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      //new: true,
      //runValidators: true,
      includeResultMetadata: true,
      ...options,
    },
  );
  if (!rawResult || !rawResult.value) return null;
  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteContact = async (contactId) => {
  const contact = await Contact.findOneAndDelete({
    _id: contactId,
  });
  return contact;
};
