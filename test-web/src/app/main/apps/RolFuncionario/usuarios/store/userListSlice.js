import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { showMessage } from 'app/store/fuse/messageSlice';
import API from 'app/services/constants/api';

export const updateUser = (idUsr, body) => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.cli_usuario}/${idUsr}`;
    const result = await axios.put(URL, body);
    console.log('result -----> updateUser', result);

    // await dispatch(showMessage({ message: '¡Usuario editado con éxito!', variant: 'success' }));
    return result;
  } catch (err) {
    console.log('*** REDUX -> updateUser ***', err.response);
    await dispatch(showMessage({ message: `${err?.response?.data?.message}`, variant: 'error' }));
    return false;
  }
};

export const updateUserDirJur = (body) => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.cli_usuario}/updateAndInactiveuser`;
    const result = await axios.post(URL, body);
    console.log('result -----> updateUser Director juridico/subdirector', result);

    // await dispatch(showMessage({ message: '¡Usuario editado con éxito!', variant: 'success' }));
    return result;
  } catch (err) {
    console.log('*** REDUX -> updateUser ***', err.response);
    await dispatch(showMessage({ message: `${err?.response?.data?.message}`, variant: 'error' }));
    return false;
  }
};

export const createUser = (body) => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.cli_usuario}`;
    const result = await axios.post(URL, body);
    console.log('result -----> createtUser', result.data);
    if (result.status === 201) {
      dispatch(
        showMessage({
          message: result.data.message,
          variant: 'error',
        })
      );
    }
    return result;
  } catch (err) {
    console.log('*** REDUX -> createtUser ***', err.response);
    await dispatch(showMessage({ message: `${err?.response?.data?.message}`, variant: 'error' }));
    return false;
  }
};

export const getUserById = (idUsr, idUser) => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${API.endpoints.cli_usuario}/${idUsr}/${idUser}`;
    const result = await axios.get(URL);
    console.log('result -----> getUserById', result.data);
    return await dispatch(setUserById(result?.data));
  } catch (err) {
    console.log('*** REDUX -> getUserById ***', err.response);
    await dispatch(showMessage({ message: `${err?.response?.data?.message}`, variant: 'error' }));
    return false;
  }
};

export const getListUsers = (page, rowsPerPage, orderBy, order, params) => async (dispatch) => {
  try {
    const URL = `${API.baseUrl}/${
      API.endpoints.cli_usuario
    }/lista?page=${page}&rows=${rowsPerPage}&order_field=${orderBy}&filters=${JSON.stringify(
      params
    )}&order_type=${order}`;
    const result = await axios.get(URL);
    await dispatch(setUserList(result?.data?.rows));
    await dispatch(setTotalRows(result.data.count));
    return true;
  } catch (err) {
    console.log('*** REDUX -> getListUsers ***', err.response);
    await dispatch(showMessage({ message: `${err?.response?.data?.message}`, variant: 'error' }));
    return false;
  }
};

const userListSlice = createSlice({
  name: 'userList',
  initialState: {
    listUsers: [],
    userById: [],
    page: 0,
    rowsPerPage: 25,
    totalRows: 0,
    loading: false,
  },
  reducers: {
    setUserList: (state, action) => {
      state.listUsers = action.payload;
    },
    setUserById: (state, action) => {
      state.userById = action.payload;
    },
    setRowsPerPage: (state, action) => {
      state.rowsPerPage = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setTotalRows: (state, action) => {
      state.totalRows = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = !state.loading;
    },
  },
});

export const { setUserList, setUserById, setRowsPerPage, setPage, setTotalRows, setLoading } =
  userListSlice.actions;

export default userListSlice.reducer;
