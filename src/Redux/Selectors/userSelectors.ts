export default {
  getUsersList: (state: any) => state.dataReducer.userList,
  getSingleUser: (state: any) => state.dataReducer.singleUser,
  getTotalPages: (state: any) => state.dataReducer.totalPages,
  getLoggedIn: (state: any) => state.dataReducer.isLoggedIn,
  getLikedUsers: (state: any) => state.dataReducer.likedUsers
};
