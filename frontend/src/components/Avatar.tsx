import React from 'react'

export function Avatar({ name, size }: { name: string , size?: "small"|"big" }) {
    return (
      <div className={`relative inline-flex items-center justify-center ${size==="small"?"w-7 h-7":"w-9 h-9"} overflow-hidden  bg-gray-400 rounded-full `}>
        <span className={` uppercase text-gray-100 ${size==="small"?"text-sm":"text-base"} `}>
          {name.split(" ").length == 2
            ? name[0] + name.split(" ")[1][0]
            : name[0]}
        </span>
      </div>
    );
  }