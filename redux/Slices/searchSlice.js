import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  searchedText: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setInputText: (state, action) => {
      if (action.payload.type === 'clear') {
        state['searchedText'] = '';
      } else {
        state['searchedText'] = action.payload.text;
      }
    },
  },
});

export const {setInputText} = searchSlice.actions;
export default searchSlice.reducer;
