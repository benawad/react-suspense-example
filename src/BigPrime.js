import React from "react";

export const BigPrime = ({ n }) => {
  let biggestPrime = 2;
  let maxIterations = 5000000;

  for (let i = 2; i < n; i++) {
    let isPrime = true;
    // check if number is prime
    for (let k = 2; k < i; k++) {
      if (i % k === 0) {
        isPrime = false;
      }
      maxIterations -= 1;
    }

    if (isPrime) {
      biggestPrime = i;
    }
    if (maxIterations < 0) {
      break;
    }
  }

  return (
    <div>
      biggest prime less than {n} is : {biggestPrime}
    </div>
  );
};
