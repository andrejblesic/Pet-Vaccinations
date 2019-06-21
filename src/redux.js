import { createStore } from "redux";

const DATASYNC = "DATASYNC";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case DATASYNC:
      state = action.data;
      return state;
    default:
      return state;
  }
};

const databaseSync = data => {
  return {
    type: DATASYNC,
    data: data
  };
};

const store = createStore(reducer);

export { databaseSync };
export default store;
