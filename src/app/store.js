import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import adminReducer from '../features/Admin/slice';
import adminAuthReducer from '../features/Admin/Authen/slice';

// compose là func ghép nhiều func làm 1 tham số duy nhất
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    adminData : adminReducer,
    adminAuth : adminAuthReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
