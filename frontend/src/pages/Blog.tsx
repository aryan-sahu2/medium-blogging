import  { useState } from "react";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { BlogPage } from "../components/BlogPage";
import { Appbar } from "../components/Appbar";
import { useSelector } from "react-redux";

export const Blog = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  //replace below code using Redux data
  // const {  loading } = useBlog({ id: id || "" });
  const blog = useSelector((state: any) =>
    state.blogReducer.value.find((item: any) => {
      if (item.id == id) {
        return item.id == id;
      }
    })
  );
  return (
    <>
      {loading ? (
        <>
          <Skeleton count={35} height={44} borderRadius={10} duration={1} />
        </>
      ) : (
        <>
          <Appbar username={blog.author.name} />
          <BlogPage blogData={blog} />
        </>
      )}
    </>
  );
};
