import { combineReducers } from '@reduxjs/toolkit';
import userList from './userListSlice';

const reducer = combineReducers({
  userList,
});

export default reducer;
