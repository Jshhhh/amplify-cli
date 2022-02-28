'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.getWhen = void 0;
function getWhen(input, answers, previousValues, amplify) {
  const conditionParser = () => {
    let andConditions = true;
    let orConditions = true;
    if (input.andConditions && input.andConditions.length > 0) {
      andConditions = input.andConditions.every(condition => findMatch(condition, answers, previousValues, amplify));
    }
    if (input.orConditions && input.orConditions.length > 0) {
      orConditions = input.orConditions.some(condition => findMatch(condition, answers, previousValues, amplify));
    }
    return andConditions && orConditions;
  };
  return conditionParser;
}
exports.getWhen = getWhen;
const findMatch = (cond, answers, previousValues, amplify) => {
  let response = true;
  if (!previousValues && cond.onCreate) {
    return false;
  }
  if (!cond.preventEdit) {
    if (cond.operator === '=' && ((answers[cond.key] != undefined && answers[cond.key] !== cond.value) || !answers[cond.key])) {
      response = false;
    } else if (cond.operator === '!=' && (!answers[cond.key] || answers[cond.key] === cond.value)) {
      response = false;
    } else if (cond.operator === 'includes' && (!answers[cond.key] || !answers[cond.key].includes(cond.value))) {
      response = false;
    } else if (cond.operator === 'configMatch' && cond.value && cond.key && amplify) {
      const configKey = amplify.getProjectConfig()[cond.key];
      return configKey.toLowerCase() === cond.value.toLowerCase();
    } else if (cond.operator === 'exists' && previousValues && !previousValues[cond.key]) {
      return false;
    }
  } else if (previousValues && Object.keys(previousValues).length > 0) {
    if (cond.preventEdit === 'always') {
      response = false;
    } else if (cond.preventEdit === 'exists' && !!previousValues[cond.key]) {
      response = false;
    } else if (cond.preventEdit === '=' && previousValues[cond.key] != undefined && previousValues[cond.key] === cond.value) {
      response = false;
    } else if (cond.preventEdit === 'existsInCurrent') {
      if (answers[cond.key]) {
        return false;
      }
    }
  }
  return response;
};
//# sourceMappingURL=get-when-function.js.map
