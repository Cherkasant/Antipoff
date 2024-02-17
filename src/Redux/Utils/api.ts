import { create } from 'apisauce';
import { CardType, RegisterDataType } from '../../constants/@types';

const api = create({
  baseURL: 'https://reqres.in/api'
});

const registerUser = (data: RegisterDataType) => {
  return api.post('/register', data);
};

const getUsersList = (page?: number) => {
  return api.get(`/users?page=${page}`);
};

const getSingleUserData = (id: number) => {
  return api.get(`/users/${id}`);
};

const updateUser = (id: number, data: CardType) => {
  return api.patch(`/users/${id}`, data);
};

export default {
  registerUser,
  getUsersList,
  getSingleUserData,
  updateUser
};
