import { createSlice } from '@reduxjs/toolkit';


const initialState= {
  user: null
}

const appUserSlice = createSlice({
  name: "appUser",
  initialState
,
  reducers: {
    loginUser: (state, action) => {
      console.log(action);
      const user = {...action.payload.user, token: action.payload.jwt }
      state.user = user;
      localStorage.setItem("appUser", JSON.stringify(user))
    },
    logoutUser: (state) => {
      state.user = null;
      console.log("logout")
      localStorage.removeItem("appUser")
      
    },
  },
});

export const { loginUser, logoutUser } = appUserSlice.actions;

export default appUserSlice.reducer;