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

const databasesync = data => {
  return {
    type: DATASYNC,
    data: data
  };
};

const store = createStore(reducer);

export { databasesync };
export default store;
