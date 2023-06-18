import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.tasks.push(action.payload);
    },
  },
});

export const {addTodo} = todoSlice.actions;
export default todoSlice.reducer;
