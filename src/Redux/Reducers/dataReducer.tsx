import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardListType, CardType, RegisterUserPayload } from '../../constants/@types';

interface dataReducerState {
  isLoggedIn: boolean;
  singleUser: CardType | null;
  userList: CardListType;
  totalPages: number;
  likedUsers: CardListType;
}

const initialState: dataReducerState = {
  singleUser: null,
  userList: [],
  totalPages: 0,
  isLoggedIn: !!localStorage.getItem('token'),
  likedUsers: []
};

const dataSlice = createSlice({
  name: 'dataReducer',
  initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<RegisterUserPayload>) => {},
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    getUsers: (state, action: PayloadAction<number | undefined>) => {},
    setUsers: (state, action: PayloadAction<CardListType>) => {
      state.userList = action.payload;
    },
    getSingleUser: (state, action: PayloadAction<number>) => {},
    setSingleUser: (state, action: PayloadAction<CardType>) => {
      state.singleUser = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    setLogoutUser: (state, action: PayloadAction<undefined>) => {},
    setLikedUsers: (state, action: PayloadAction<CardType>) => {
      const { ...card } = action.payload;
      const likedUsersIndex = state.likedUsers.findIndex((user) => user.id === card.id);
      likedUsersIndex === -1 ? state.likedUsers.push(card) : state.likedUsers.splice(likedUsersIndex, 1);
    }
  }
});

export const {
  registerUser,
  getUsers,
  setUsers,
  getSingleUser,
  setSingleUser,
  setTotalPages,
  setLoggedIn,
  setLogoutUser,
  setLikedUsers
} = dataSlice.actions;
export default dataSlice.reducer;
