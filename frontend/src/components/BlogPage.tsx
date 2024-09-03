import { Avatar } from "./Avatar";

export const BlogPage = ({
  blogData,
}: {
  blogData: {
    content: string;
    title: string;
    publishedDate: string;
    id: string;
    author: {
      name: string;
    };
  };
}



) => {
  return (
    <>
      <div className="mainBlogPage sm:flex sm:flex-row flex flex-col gap-24 mx-5 sm:px-5 sm:gap-5 mt-10 sm:items-start sm:justify-between sm:mx-auto max-w-screen-lg ">
        <div className="blogContent sm:w-8/12 ">
          <h1 className="text-6xl font-extrabold mb-7 sm:mb-8 sm:w-[85%] ">
            {blogData.title}
          </h1>
          <h4 className=" mb-4 sm:mb-2 font-semibold text-zinc-600">
            Posted on August 24, 2023
          </h4>
          {/* whatever published data is present here */}
          <div className="text-zinc-900 leading-7 text-lg pb-10 font-semibold">
            <div dangerouslySetInnerHTML={{ __html: blogData.content }} />
          </div>
        </div>
        <div className="authorDetails sm:w-4/12 w-full ">
          <h2 className="font-normal text-lg text-zinc-900 mb-3">Author</h2>
          <div className="flex items-center justify-start gap-4">
            <div className="w-10">
              <Avatar
                name={blogData.author.name || "Anonymous Potato"}
                size="small"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className=" text-3xl font-bold capitalize">
                {blogData.author.name || "Anonymous Potato"}
              </h1>
              <p className=" text-zinc-500 font-normal ">
                Create the bio data/status field in the db in the User table for
                this and extract from there and put it here
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
