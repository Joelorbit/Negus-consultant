import React from "react";

const NoData = ({ dataName }) => {
  return (
    <div className="w-full text-center mt-40">
      <img src="/hippo-empty-cart.png" alt="empty" className="w-40 mx-auto" />
      <p className="">No {dataName}</p>
    </div>
  );
};

export default NoData;
