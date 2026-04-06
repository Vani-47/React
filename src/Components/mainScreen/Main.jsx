import React from "react";

const Main = () => {
  const data = JSON.parse(localStorage.getItem("userDetails"));
  console.log("data", data);
  return <div>Welcome {data?.data?.userData?.firstName}</div>;
};

export default Main;
