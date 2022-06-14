import _ from 'lodash';

const valueParsing = (val) => {
  if (!_.isObject(val)) {
    return typeof val === 'string' ? `'${val}'` : val;
  }
  return '[complex value]';
};

const plain = (diff) => {
  const iter = (tree, path) => {
    const result = tree.flatMap((node) => {
      const {
        key,
        value,
        type,
        oldValue,
        newValue,
        children,
      } = node;
      const newPath = path.concat([key]);
      switch (type) {
        case 'added':
          return `Property '${newPath.join('.')}' was added with value: ${valueParsing(value)}`;
        case 'deleted':
          return `Property '${newPath.join('.')}' was removed`;
        case 'changed':
          return `Property '${newPath.join('.')}' was updated. From ${valueParsing(oldValue)} to ${valueParsing(newValue)}`;
        case 'nested':
          return iter(children, newPath);
        case 'unchanged':
          return [];
        default:
          throw new Error(`Error: unknown type ${type}`);
      }
    });
    return result.join('\n');
  };
  return iter(diff, []);
};

export default plain;
