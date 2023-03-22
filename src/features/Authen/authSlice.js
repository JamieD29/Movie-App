import produce from "immer";
import * as actionType from "./constants";
const initialState = {
  userLogin: null,
  userLogged: null,
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case actionType.USER_LOGIN_PENDING:
        draft.isLoading = true;
        break;
      case actionType.USER_LOG_IN:
        draft.userLogin = action.payload;
        draft.isLoading = false;
        break;
      case actionType.USER_LOGGED:
        draft.userLogged = action.payload;
        draft.isLoading = false;
        break;
      case actionType.USER_LOGIN_REJECTED:
        draft.isLoading = false;
        break;
      case actionType.USER_LOG_OUT:
        draft.userLogin = null;
        draft.userLogged = null;
        draft.isLoading = true;
        break;
      default:
        break;
    }
  });
};

export default reducer;
