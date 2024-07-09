import { Schema, model } from 'mongoose';
import { mongooseSaveError, setUpdateSettings } from './hooks.js';
import { emailRegexp } from '../../constants/constants.js';

const userShema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      unique: true,
      match: emailRegexp,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
//хук перед обробкоб
userShema.pre('findOneAndUpdate', setUpdateSettings);
//тільки якщо сталась помилка
//якщо після збереження помилка === колбек
//внутрі метод записується + колбек
userShema.post('save', mongooseSaveError);

//це після оновлення об'єкту якщо є помилки
userShema.post('findOneAndUpdate', mongooseSaveError);

const User = model('users', userShema);
export default User;
