import { Contact } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
  userId,
}) => {
  const skip = (page - 1) * perPage;

  const contactQuery = Contact.find();

  if (filter.type !== undefined) {
    contactQuery.where('contactType').equals(filter.type);
  }

  if (filter.isFavourite !== undefined) {
    contactQuery.where('isFavourite').equals(filter.isFavourite);
  }

  contactQuery.where('userId').equals(userId);

  const [contactsTotalItems, contacts] = await Promise.all([
    Contact.find().merge(contactQuery).countDocuments(),
    Contact.find()
      .merge(contactQuery)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage)
      .exec(),
  ]);

  const paginationInformation = calculatePaginationData(
    contactsTotalItems,
    page,
    perPage,
  );
  return {
    items: contacts,
    ...paginationInformation,
  };
};

export const getContactById = async (id, userId) => {
  return await Contact.findOne({ _id: id, userId });
};

export const createContact = async (payload) => {
  return await Contact.create(payload);
};
export const deleteContact = async (id, userId) => {
  return await Contact.findOneAndDelete({ _id: id, userId });
};
export const patchContact = async (id, payload, userId) => {
  return await Contact.findOneAndUpdate({ _id: id, userId }, payload, {
    new: true,
  });
};
