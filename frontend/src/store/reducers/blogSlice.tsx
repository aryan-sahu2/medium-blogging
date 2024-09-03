import { createSlice } from "@reduxjs/toolkit";

export interface BlogSlice {
  value: [];
}

// const d = useBlogs()

const initialState: BlogSlice = {
  value: [],
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    
    addBlog: (state, action) => {
      state.value = action.payload;
    },
    removeBlog: (state) => {
      state.value = [];
    },
  },
});

export const { addBlog, removeBlog } = blogSlice.actions; //this will be given to components for actions to be performed.
export default blogSlice.reducer; //this will be given to store


