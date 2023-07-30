import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  headers: {
    sellHeader: true,
    profileHeader: true,
    searchHeader: true,
  },
};

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    headerHideShow: (state, action) => {
      console.log(
        action.payload.type,
        action.payload.show,
        state.headers.searchHeader,
      );

      if (action.payload.type === 'sellheader') {
        state.headers.sellHeader = action.payload.show;
      } else if (action.payload.type === 'profileheader') {
        state.headers.profileHeader = action.payload.show;
      } else if (action.payload.type === 'searchHeaderType') {
        console.log('call');
        state.headers.searchHeader = action.payload.show;
      } else {
        console.log('lauda le lo mera');
      }
    },
  },
});

export const {headerHideShow} = headerSlice.actions;
export default headerSlice.reducer;
