import produce from "immer";
import * as actionType from "../constants/type";
const initialState = {
  adminLogin: null,
  adminLogged: null,
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case actionType.ADMIN_SIGIN_PENDING:
        draft.isLoading = true;
        break;
      case actionType.ADMIN_SIGN_IN:
        draft.adminLogin = action.payload;
        draft.isLoading = false;
        break;
      case actionType.ADMIN_LOGGED:
        draft.adminLogged = action.payload;
        draft.isLoading = false;
        break;
      case actionType.ADMIN_SIGIN_REJECTED:
        draft.isLoading = false;
        break;
      case actionType.ADMIN_LOG_OUT:
        draft.adminLogin = null;
        draft.adminLogged = null;
        draft.isLoading = true;
        break;
      default:
        break;
    }
  });
};

export default reducer;
