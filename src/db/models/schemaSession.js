import { Schema, model } from 'mongoose';
import { mongooseSaveError, setUpdateSettings } from './hooks.js';

const sessionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users', //тут ім'я з якої колекції
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    accessTokenValidUntil: {
      type: Date,
      required: true,
    },
    refreshTokenValidUntil: {
      type: Date,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

//хук перед обробкоб
sessionSchema.pre('findOneAndUpdate', setUpdateSettings);
//тільки якщо сталась помилка
//якщо після збереження помилка === колбек
//внутрі метод записується + колбек
sessionSchema.post('save', mongooseSaveError);

//це після оновлення об'єкту якщо є помилки
sessionSchema.post('findOneAndUpdate', mongooseSaveError);

const Session = model('session', sessionSchema);
export default Session;
