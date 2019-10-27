import React from "react";

export const Person = ({ resource }) => {
  const person = resource.person.read();

  return <div>{person.name.first}</div>;
};
