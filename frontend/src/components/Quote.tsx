import React from "react";

export const Quote = () => {
  return (
    <div className="bg-slate-200 h-full w-full flex justify-center items-center  ">
      <div className="flex flex-col mx-auto w-[80%] justify-center items-start">
        <div className="text-3xl font-bold  ">"{`The customer support I recieved was exceptional. The support team went above and beyond to address my concerns.`}"</div>
        <div className="author text-lg font-semibold mt-5 capitalize">Julies Winfield</div>
        <div className="position font-medium opacity-[0.4] ">CEO, Acme Inc</div>
      </div>
    </div>
  );
};
