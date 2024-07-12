import bcrypt from 'bcrypt';
//хешуємо
export const hashValue = (value) => {
  return bcrypt.hash(value, 10);
};

//перевіряємо хеш
export const compareHash = (value, hash) => bcrypt.compare(value, hash);
