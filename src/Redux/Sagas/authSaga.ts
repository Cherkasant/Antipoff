import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  getSingleUser,
  getUsers,
  registerUser,
  setLoggedIn,
  setLogoutUser,
  setSingleUser,
  setTotalPages,
  setUsers
} from '../Reducers/dataReducer';
import { PayloadAction } from '@reduxjs/toolkit';
import { RegisterUserPayload } from '../../constants/@types';
import api from '../Utils/api';

function* registerUserWorker(action: PayloadAction<RegisterUserPayload>) {
  const { data: registerData, callback } = action.payload;
  const { ok, data, problem } = yield call(api.registerUser, registerData);
  if (ok && data) {
    localStorage.setItem('token', data.token);
    yield put(setLoggedIn(true));
    callback();
  } else {
    console.warn('Error while register user', problem);
  }
}
function* getUsersWorker(action: PayloadAction<number | undefined>) {
  const { ok, data, problem } = yield call(api.getUsersList, action.payload);
  if (ok && data) {
    yield put(setTotalPages(data.total));
    yield put(setUsers(data.data));
  } else {
    console.warn('Error while fetching users', problem);
  }
}

function* getSingleUserWorker(action: PayloadAction<number>) {
  const { ok, data, problem } = yield call(api.getSingleUserData, action.payload);
  if (ok && data) {
    yield put(setSingleUser(data.data));
  } else {
    console.warn('Error while fetching single user', problem);
  }
}

function* logoutUserWorker() {
  yield put(setLoggedIn(false));
  localStorage.removeItem('token');
}

export default function* authSagaWatcher() {
  yield all([
    takeLatest(registerUser, registerUserWorker),
    takeLatest(getUsers, getUsersWorker),
    takeLatest(getSingleUser, getSingleUserWorker),
    takeLatest(setLogoutUser, logoutUserWorker)
  ]);
}
