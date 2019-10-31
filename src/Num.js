import React from "react";

export const Num = ({ resource }) => {
  const n = resource.num.read();
  return <div>{n}</div>;
};
