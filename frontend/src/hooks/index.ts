import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { useDispatch, useSelector } from "react-redux";
import { addBlog } from "../store/reducers/blogSlice";

export interface Blogs{
    content: string;
    title: string;
    publishedDate: string;
    id:string;
    author:{
        name: string
    }
}


export const useBlogs = () => {
  const blogState: any = useSelector((state: any) => state.blogReducer.value);
  const dispatch = useDispatch()
    
  const [loading, setLoading] = useState(true);
  const [blogs, setblogs] = useState<Blogs[]>([]);

  {useEffect(() => {
    if(blogState.length===0){
      axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk/all`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        setblogs(response.data);
        setLoading(false);
      });
    }
    else{
      setLoading(false);
      setblogs(blogState)
    }
    
  }, [blogState.length]);

  dispatch(addBlog(blogs))}

  
  
  return {
    loading,
    blogs,
  };
};



export const useBlog = ({id}: {id:string})=>{
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blogs>(Object);
  
    useEffect(() => {
      axios
        .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
          headers: { Authorization: localStorage.getItem("token") },
        })
        .then((response) => {
          setBlog(response.data.data);          
          setLoading(false);
        });
    }, []);
  
    return {
      loading,
      blog,
    };
}