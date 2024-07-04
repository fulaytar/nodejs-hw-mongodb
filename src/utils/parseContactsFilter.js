import { booleanList, typeList } from '../constants/constants';

const parseContactsFilter = ({ type }) => {
  const types = typeList.includes(type) || booleanList.includes(type);
  const parsedType = types ? type : null;
  return {
    type: parsedType,
  };
};
export default parseContactsFilter;
