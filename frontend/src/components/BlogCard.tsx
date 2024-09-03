import React from "react";
import { Avatar } from "./Avatar";
import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: string;
}
export const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
  id,
}: BlogCardProps) => {
 
  const displayableContent =<div dangerouslySetInnerHTML={{ __html: content.slice(0, 160) + "..."}} /> 
  
  return (
    <>
      <Link to={`/blog/${id}`}>
        <div className="sm:mx-2 px-4 py-2 mb-2 bg-zinc-50 rounded-md shadow-sm border-b cursor-pointer border-slate-300">
          <div className="capitalize flex  items-center justify-start gap-2 mb-2">
            <Avatar name={authorName} size="small" />
            <div className="inline-block font-medium">{authorName} • </div>
            <div className="text-zinc-400 font-semibold inline-block">
              {publishedDate}
            </div>
          </div>
          <div className="font-bold text-2xl capitalize">{title}</div>
          <div className="text-zinc-600 font-serif">
            {displayableContent}
          </div>
          <div className="readingTag mt-2 px-2 py-1 text-zinc-500 font-semibold bg-zinc-100 rounded inline-block ">
            {Math.ceil(content.length / 500)}
            {Math.ceil(content.length / 160) > 1 ? " minutes" : " minute"}{" "}
            {"read"}
          </div>
        </div>
      </Link>
    </>
  );
};
