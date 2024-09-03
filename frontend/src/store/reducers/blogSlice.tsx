import { createSlice } from "@reduxjs/toolkit";
import { Blogs, useBlogs } from "../../hooks";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";

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
    removeBlog: (state, action) => {
      state.value = [];
    },
  },
});

export const { addBlog, removeBlog } = blogSlice.actions; //this will be given to components for actions to be performed.
export default blogSlice.reducer; //this will be given to store


