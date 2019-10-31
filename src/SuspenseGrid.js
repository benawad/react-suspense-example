import React, { Suspense, SuspenseList, useState } from "react";
import { wrapPromise, randomNumberAndTimeout } from "./PersonApi";
import { Num } from "./Num";

export const SuspenseGrid = () => {
  let body = [];
  const [n, setN] = useState(1000);
  const [cols, setCols] = useState(100);
  const [groupSize, setGroupSize] = useState(3);
  const [innerRevealOrder, setInnerRevealOrder] = useState(false);
  const [outerRevealOrder, setOuterRevealOrder] = useState("");
  const [outerTail, setOuterTail] = useState(undefined);
  const fetchResources = () => {
    const resources = [];
    for (let i = 0; i < n; i++) {
      resources.push(wrapPromise(randomNumberAndTimeout()));
    }
    return resources;
  };
  const [resources, setResources] = useState(() => fetchResources());

  for (let i = 0; i < n / groupSize - groupSize; i++) {
    const group = [];
    for (let k = 0; k < groupSize; k++) {
      const idx = i * groupSize + k;
      group.push(
        <Suspense key={idx} fallback={<div>.</div>}>
          <Num resource={{ num: resources[idx] }} />
        </Suspense>
      );
    }
    if (innerRevealOrder) {
      body.push(
        <SuspenseList key={i} revealOrder={innerRevealOrder}>
          {group}
        </SuspenseList>
      );
    } else {
      body.push(...group);
    }
  }

  return (
    <div>
      <h1>Grid Boi</h1>
      <button
        onClick={() => {
          setOuterRevealOrder("");
          setResources(fetchResources());
        }}
      >
        no suspense list
      </button>
      <button
        onClick={() => {
          setOuterRevealOrder("forwards");
          setResources(fetchResources());
        }}
      >
        forwards
      </button>
      <button
        onClick={() => {
          setOuterRevealOrder("backwards");
          setResources(fetchResources());
        }}
      >
        backwards
      </button>
      <button
        onClick={() => {
          setOuterRevealOrder("together");
          setResources(fetchResources());
        }}
      >
        together
      </button>
      <button
        onClick={() => {
          setOuterRevealOrder("forwards");
          setOuterTail("hidden");
          setResources(fetchResources());
        }}
      >
        tail: hidden
      </button>
      <button
        onClick={() => {
          setOuterRevealOrder("forwards");
          setOuterTail("collapsed");
          setResources(fetchResources());
        }}
      >
        tail: collapsed
      </button>
      <button
        onClick={() => {
          setOuterRevealOrder("forwards");
          setOuterTail("collapsed");
          setInnerRevealOrder("forwards");
          setResources(fetchResources());
        }}
      >
        nested suspense lists with collapsed
      </button>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, auto)`
        }}
      >
        {outerRevealOrder ? (
          <SuspenseList tail={outerTail} revealOrder={outerRevealOrder}>
            {body}
          </SuspenseList>
        ) : (
          body
        )}
      </div>
    </div>
  );
};
