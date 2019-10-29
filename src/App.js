import React, { Suspense, useState } from "react";
import { createResource, wrapPromise } from "./PersonApi";
import { Person } from "./Person";
import { Num } from "./Num";
import { ErrorBoundary } from "./ErrorBoundary";
import { PostResult } from "./PostResult";

const initialResource = createResource();

// fetch new data
// handling errors
// post requests

function App() {
  // const [resource, setResource] = useState(() => createResource());
  const [resource, setResource] = useState(initialResource);
  const [postResource, setPostResource] = useState({
    result: {
      read() {
        return null;
      }
    }
  });

  return (
    <div className="App">
      <ErrorBoundary>
        <Suspense fallback={<h1>loading num...</h1>}>
          <Num resource={resource} />
        </Suspense>
        <Suspense fallback={<h1>loading person...</h1>}>
          <Person resource={resource} />
          <PostResult resource={postResource} />
        </Suspense>
      </ErrorBoundary>
      <button
        onClick={() => {
          const promise = fetch("https://ent5gpcpkaax.x.pipedream.net/", {
            method: "POST",
            body: JSON.stringify({ hello: "world" })
          })
            .then(x => x.json())
            .then(x => {
              console.log(x);
              // history.push
              return x;
            });

          setPostResource({ result: wrapPromise(promise) });
        }}
      >
        call post request
      </button>
      <button
        onClick={() => {
          setResource(createResource());
        }}
      >
        refresh data
      </button>
    </div>
  );
}

export default App;
