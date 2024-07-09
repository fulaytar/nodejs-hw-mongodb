export const mongooseSaveError = (error, data, next) => {
  const { name, code } = error;
  console.log(name, code);
  error.status = name === 'MongoServerError' && code === 11000 ? 409 : 400;
  next();
};

export const setUpdateSettings = function (next) {
  this.options.new = true;
  this.options.runValidators = true;
  next();
};
