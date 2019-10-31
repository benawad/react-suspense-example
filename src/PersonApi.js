const fetchPerson = () => {
  return fetch("https://randomuser.me/api")
    .then(x => x.json())
    .then(x => x.results[0]);
};

export const wrapPromise = promise => {
  let status = "pending";
  let result = "";
  let suspender = promise.then(
    r => {
      status = "success";
      result = r;
    },
    e => {
      status = "error";
      result = e;
    }
  );

  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      }

      return result;
    }
  };
};

export const randomNumber = () => {
  return new Promise(res => setTimeout(() => res(Math.random()), 3000));
};

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

export const randomNumberAndTimeout = () => {
  return new Promise(res =>
    setTimeout(
      () => res(Math.round(Math.random() * 1000)),
      getRandomArbitrary(1000, 5000)
    )
  );
};

export const createResource = () => {
  return {
    person: wrapPromise(fetchPerson()),
    num: wrapPromise(randomNumber())
  };
};
