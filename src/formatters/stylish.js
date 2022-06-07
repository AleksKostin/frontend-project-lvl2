import _ from 'lodash';

const tab = '  ';

const valueParsing = (val, lvl) => {
  if (!_.isObject(val)) {
    return val;
  }
  const currentIndent = tab.repeat(lvl + 2);
  const bracketIndent = tab.repeat(lvl);
  const obj = Object.entries(val);
  const lines = obj.map(([currentKey, currentVal]) => `${currentIndent}${currentKey}: ${valueParsing(currentVal, lvl + 2)}`);
  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

const stylish = (diff) => {
  const iter = (tree, depth) => {
    const indent = tab.repeat(depth);
    const result = tree.map((node) => {
      const {
        key,
        value,
        oldValue,
        newValue,
        type,
        children,
      } = node;
      switch (type) {
        case 'added':
          return `${indent}+ ${key}: ${valueParsing(value, depth + 1)}`;
        case 'deleted':
          return `${indent}- ${key}: ${valueParsing(value, depth + 1)}`;
        case 'changed':
          return `${indent}- ${key}: ${valueParsing(oldValue, depth + 1)}\n${indent}+ ${key}: ${valueParsing(newValue, depth + 1)}`;
        case 'nested':
          return `${indent}  ${key}: ${iter(children, depth + 2)}${indent}`.replace(`}${indent}`, `${indent}  }`);
        case 'unchanged':
          return `${indent}  ${key}: ${valueParsing(value, depth + 1)}`;
        default:
          throw new Error(`Error: unknown type ${type}`);
      }
    });
    return ['{', ...result, '}'].join('\n');
  };
  return iter(diff, 1);
};

export default stylish;
