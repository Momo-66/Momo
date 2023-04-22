import { BUTTON_HEIGHT } from './Values';

export const getCenterPosition = (offsetY) => {
  return getIndexFromOffset(offsetY) * BUTTON_HEIGHT;
};
export const getCenterPositionFromIndex = (index) => {
  return index * BUTTON_HEIGHT;
};
export const getIndexFromOffset = (offsetY) => {
  return Math.round(offsetY / BUTTON_HEIGHT);
};
export const fillEmpty = (visibleCount, [...values]) => {
  const fillCount = (visibleCount - 1) / 2;
  for (let i = 0; i < fillCount; i++) {
    values.unshift('');
    values.push('');
  }
  return values;
};

export const asPickerFormat = () => {
  const _date = new Date();
  _date.setHours(6,0,0,0);
  return _date;
};