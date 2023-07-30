import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  everyPinnedProducts: [],
};

const pinSlice = createSlice({
  name: 'pin',
  initialState,
  reducers: {
    pinUnPinProducts: (state, action) => {
      if (action.payload.type === 'empty') {
        state.everyPinnedProducts.length = 0;
      } else {
        let existStatus = state.everyPinnedProducts.findIndex(
          e => e._id === action.payload.productDetails._id,
        );
        if (existStatus > -1) {
          state.everyPinnedProducts.splice(existStatus, 1);
        } else {
          state.everyPinnedProducts.push(action.payload.productDetails);
        }
      }
    },
  },
});

export const {pinUnPinProducts} = pinSlice.actions;
export default pinSlice.reducer;
