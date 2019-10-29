import React, { useTransition } from "react";

export const MyButton = ({ children, onClick, ...props }) => {
  const [startTransition, isPending] = useTransition({
    timeoutMs: 3000
  });

  return (
    <>
      <button
        onClick={() => {
          startTransition(() => {
            onClick();
          });
        }}
        disabled={isPending}
        {...props}
      >
        {children}
      </button>
      {isPending ? <div>loading...</div> : null}
    </>
  );
};
