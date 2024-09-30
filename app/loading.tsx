import React from "react";
import Spinner from "./_components/Spinner";

const loading = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white">
      <Spinner />
    </div>
  );
};

export default loading;
