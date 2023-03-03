import produce from "immer";
import * as actionType from '../constants/type';
const initialState = {
  adminLogin: null,
};

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case actionType.ADMIN_SIGN_IN:
        draft.adminLogin = action.payload;
        break;
      default:
        break;
    }
  });
};

export default reducer;