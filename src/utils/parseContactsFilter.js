import { booleanList, typeList } from '../constants/constants.js';

const parseBoolean = (value) => {
  if (typeof value !== 'string') return;
  if (!booleanList.includes(value)) return;

  return value === 'true';
};

const parseContactFilterParams = ({ type, isFavourite }) => {
  const parsedType = typeList.includes(type) ? type : null;
  const parsedFavourite = parseBoolean(isFavourite);

  return {
    type: parsedType,
    isFavourite: parsedFavourite,
  };
};

export default parseContactFilterParams;
