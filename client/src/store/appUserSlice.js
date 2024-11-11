import { createSlice } from '@reduxjs/toolkit';


const storedUser = localStorage.getItem("appUser") ? JSON.parse(localStorage.getItem("appUser")) : null;

const initialState= {
  user: storedUser
}


const appUserSlice = createSlice({
  name: "appUser",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const user = {
        ...action.payload.user,
        token: action.payload.jwt
      };
      state.user = user;
      localStorage.setItem("appUser", JSON.stringify(user));
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("appUser");
    },
  },
});


export const { loginUser, logoutUser } = appUserSlice.actions;

export default appUserSlice.reducer;