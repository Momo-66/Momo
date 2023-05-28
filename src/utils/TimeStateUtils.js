const getToUtcDateState = (value) => {
    return new Date(value.getTime() - (9 * 60 * 60 * 1000));
};

const getFromUtcDateState = (value) => {
    var date = new Date(value);
    return new Date(date.getTime() + (9 * 60 * 60 * 1000));
};
  
export {getToUtcDateState, getFromUtcDateState,};