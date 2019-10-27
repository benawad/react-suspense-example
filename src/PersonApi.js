const fetchPerson = () => {
  return fetch("https://randomuser.me/api")
    .then(x => x.json())
    .then(x => x.results[0]);
};

const wrapPromise = promise => {
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

export const createResource = () => {
  return {
    person: wrapPromise(fetchPerson()),
    num: wrapPromise(randomNumber())
  };
};
