import React, { Suspense, useState, SuspenseList } from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import { Num } from "./Num";
import { Person } from "./Person";
import { createResource } from "./PersonApi";
import { MyButton } from "./MyButton";
import { SuspenseGrid } from "./SuspenseGrid";

const initialResource = createResource();

function App() {
  // const [resource, setResource] = useState(() => createResource());
  const [resource, setResource] = useState(initialResource);

  return (
    <div className="App">
      <ErrorBoundary>
        <SuspenseList revealOrder="together">
          <Suspense fallback={<h1>loading num...</h1>}>
            <Num resource={resource} />
          </Suspense>
          <Suspense fallback={<h1>loading person...</h1>}>
            <Person resource={resource} />
          </Suspense>
        </SuspenseList>
      </ErrorBoundary>
      <MyButton
        onClick={() => {
          setResource(createResource());
        }}
      >
        refresh data
      </MyButton>
      <SuspenseGrid />
    </div>
  );
}

export default App;
