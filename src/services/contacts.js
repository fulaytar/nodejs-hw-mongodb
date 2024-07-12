import { contactsFieldList, sortOrderList } from '../constants/constants.js';
import { Contact } from '../db/models/shemaContacts.js';
import calcPaginationData from '../utils/calcPaginationData.js';

export const getContacts = async ({
  page = 1,
  perPage,
  sortBy = contactsFieldList[0],
  sortOrder = sortOrderList[0],
  filter,
}) => {
  const request = Contact.find();
  let totalItems = await Contact.find().countDocuments();
  if (filter.userId) {
    request.where('userId').equals(filter.userId);
    totalItems = await Contact.find().merge(request).countDocuments();
  }
  if (filter.type) {
    request.where('contactType').equals(filter.type);
    totalItems = await Contact.find().merge(request).countDocuments();
  }
  if (filter.isFavourite) {
    request.where('isFavourite').equals(filter.isFavourite);
    totalItems = await Contact.find().merge(request).countDocuments();
  }
  const skip = (page - 1) * perPage;
  const data = await request
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder })
    .exec();

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

export const getContactsByFilter = async (filter) => {
  const contact = await Contact.findOne(filter);
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

export const deleteContact = async (contactId, userId) => {
  const contact = await Contact.findOneAndDelete({
    _id: contactId,
    userId: userId, // Перевіряємо, чи контакт належить користувачу
  });
  return contact;
};
