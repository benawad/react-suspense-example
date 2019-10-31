import React, { Suspense, useState, useDeferredValue } from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import { Num } from "./Num";
import { Person } from "./Person";
import { createResource } from "./PersonApi";
import { MyButton } from "./MyButton";
import { BigPrime } from "./BigPrime";

const initialResource = createResource();

function App() {
  // const [resource, setResource] = useState(() => createResource());
  const [resource, setResource] = useState(initialResource);
  const deferredResource = useDeferredValue(resource, {
    timeoutMs: 5000
  });
  const [n, setN] = useState(10);
  const deferredN = useDeferredValue(n, {
    timeoutMs: 10000
  });

  const isStale = deferredResource !== resource;

  return (
    <div className="App">
      <ErrorBoundary>
        <Suspense fallback={<h1>loading num...</h1>}>
          <div style={{ color: isStale ? "#444" : "black" }}>
            <Num resource={deferredResource} />
          </div>
        </Suspense>
        <Suspense fallback={<h1>loading person...</h1>}>
          <Person resource={resource} />
        </Suspense>
      </ErrorBoundary>
      <button
        onClick={() => {
          setResource(createResource());
        }}
      >
        refresh data
      </button>
      <BigPrime n={deferredN} />
      <input value={"" + n} onChange={e => setN(parseInt(e.target.value))} />
      {/* <SuspenseGrid /> */}
    </div>
  );
}

export default App;
