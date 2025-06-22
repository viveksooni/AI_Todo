import React from "react";
import { PulseLoader } from "react-spinners";
export default function LoadingScreen() {
  return (
    <div className="mx-auto order-2 md:order-1  my-auto">
      <div className="text-5xl font-bold opacity-10 -translate-y-5">
        <PulseLoader></PulseLoader>
      </div>
    </div>
  );
}
