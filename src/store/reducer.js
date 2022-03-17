import { combineReducers } from 'redux';
import userReducer from './users/slice';

const rootReducer = combineReducers({
  users: userReducer
});

export default rootReducer;
