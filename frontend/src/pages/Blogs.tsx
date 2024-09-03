import { BlogCard } from "../components/BlogCard";
import { Appbar } from "../components/Appbar";
import { useBlogs } from "../hooks";
import Skeleton from "react-loading-skeleton";
import { Key } from "react";

export const Blogs = () => {

    const { loading, blogs } = useBlogs();

  return (
    <>
      <Appbar username="Aryan" />
      <div className="mx-5 sm:mx-auto sm:max-w-screen-md py-5">
        {!loading ? (
          blogs.map(
            (
              item: {
                title: string;
                author: { name: string };
                content: string;
                id: string;
              },
              index: Key | null | undefined
            ) => {
              return (
                <BlogCard
                  key={index}
                  title={item.title}
                  authorName={item.author.name}
                  publishedDate="12/12/12"
                  content={item.content}
                  id={item.id}
                />
              );
            }
          )
        ) : (
          <Skeleton count={35} height={44} borderRadius={10} duration={1} />
        )}
      </div>
    </>
  );
};
