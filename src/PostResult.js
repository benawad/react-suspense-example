import React from "react";

export const PostResult = ({ resource }) => {
  const data = resource.result.read();

  if (!data) {
    return null;
  }

  return <div>the result of the post request: {JSON.stringify(data)}</div>;
};
