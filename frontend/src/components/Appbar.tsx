import React from "react";
import { Avatar } from "./Avatar";
import { Link, useLocation, useParams } from "react-router-dom";

export const Appbar = ({
  username,
  isDraft = false,
  publishFunction
}: {
  username: string;
  isDraft?: boolean;
  publishFunction?: () => void;
}) => {
  const { pathname } = useLocation();
  

  return (
    <div className="appbar mx-5 sm:mx-auto sm:max-w-screen-xl py-5  sm:px-3">
      <div className="flex items-center justify-between">
        <div className="flex gap-3 items-center justify-start">
          <Link to={`/blogs`}>
            <svg
              className="h-10 w-10 cursor-pointer"
              width="800px"
              height="800px"
              viewBox="0 -55 256 256"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid"
            >
              <g>
                <path
                  d="M72.2009141,1.42108547e-14 C112.076502,1.42108547e-14 144.399375,32.5485469 144.399375,72.6964154 C144.399375,112.844284 112.074049,145.390378 72.2009141,145.390378 C32.327779,145.390378 0,112.844284 0,72.6964154 C0,32.5485469 32.325326,1.42108547e-14 72.2009141,1.42108547e-14 Z M187.500628,4.25836743 C207.438422,4.25836743 223.601085,34.8960455 223.601085,72.6964154 L223.603538,72.6964154 C223.603538,110.486973 207.440875,141.134463 187.503081,141.134463 C167.565287,141.134463 151.402624,110.486973 151.402624,72.6964154 C151.402624,34.9058574 167.562834,4.25836743 187.500628,4.25836743 Z M243.303393,11.3867175 C250.314,11.3867175 256,38.835526 256,72.6964154 C256,106.547493 250.316453,134.006113 243.303393,134.006113 C236.290333,134.006113 230.609239,106.554852 230.609239,72.6964154 C230.609239,38.837979 236.292786,11.3867175 243.303393,11.3867175 Z"
                  fill="#000000"
                ></path>
              </g>
            </svg>
          </Link>
          {isDraft && `Draft in ${username}'s`}
        </div>
        <div className="flex gap-3 items-center justify-start">
          {pathname != "/publish" && (
            <Link to={`/publish`}>
              <button className="rounded-full bg-blue-600 font-semibold text-zinc-50 hover:text-blue-600 hover:border-double hover:bg-white hover:border hover:border-zinc-300 transition-all px-4 py-1">
                Create New Blog
              </button>
            </Link>
          )}

          {isDraft && (
            <button onClick={publishFunction} className="rounded-full bg-green-600 font-semibold text-zinc-50 hover:text-white hover:bg-green-700 transition-all px-4 py-1">
              Publish
            </button>
          )}
          <Avatar name={username} size="big" />
        </div>
      </div>
    </div>
  );
};
