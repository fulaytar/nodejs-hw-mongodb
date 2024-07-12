import { Schema, model } from 'mongoose';

import { typeList } from '../../constants/constants.js';
import { mongooseSaveError, setUpdateSettings } from './hooks.js';

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'You need add name'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'You need add phoneNumber'],
    },
    email: {
      type: String,
      optional: true,
    },
    isFavourite: {
      type: Boolean,
      default: false,
      //match - регулярні виази
    },
    contactType: {
      type: String,
      enum: typeList,
      default: 'personal',
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

//хук перед обробкоб
contactsSchema.pre('findOneAndUpdate', setUpdateSettings);
//тільки якщо сталась помилка
//якщо після збереження помилка === колбек
//внутрі метод записується + колбек
contactsSchema.post('save', mongooseSaveError);

//це після оновлення об'єкту якщо є помилки
contactsSchema.post('findOneAndUpdate', mongooseSaveError);

export const Contact = model('contacts', contactsSchema);
