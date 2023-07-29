import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  profile: {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.profile = {...action.payload};
    },
    updateUser: (state, action) => {
      console.log('Action payload', action);
      if (action.payload.type === 'pending') {
        console.log(action.payload);
        state.profile.active = action.payload.data;
      } else {
        state.profile.verification = action.payload.data;
      }
    },
    resetUser: (state, action) => {
      state.profile = {};
    },
  },
});

export const {addUser, updateUser, resetUser} = authSlice.actions;
export default authSlice.reducer;
