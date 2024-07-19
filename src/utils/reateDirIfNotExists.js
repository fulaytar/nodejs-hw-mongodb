import fs from 'node:fs/promises';

const createDirIfNotExists = async (url) => {
  try {
    await fs.access(url); //перевірка чи є папка
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fs.mkdir(url); //якщо нема то ліпимо
    }
  }
};

export default createDirIfNotExists;
