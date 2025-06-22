import React from "react";

export default function Footer() {
     return (
    <div className="absolute bottom-0 w-full px-4">
      <div className="flex justify-between text-xs opacity-20 translate-y-8">
        <div>
          <strong className="font-extrabold text-sm">&copy;</strong>{" "}
          {new Date().getFullYear()} Copyright by Vivek
        </div>
        <div>
          Version: <strong>1.5</strong>
        </div>
      </div>
    </div>
  );
}
