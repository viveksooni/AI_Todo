import { SignIn } from "@clerk/clerk-react";
import React from "react";
import { Link } from "react-router";

export default function SignInClerk() {
  return (
    <div className="h-screen flex flex-col gap-4 justify-center items-center bg-orange-300/20">
      <Link to="/">
        <div className="text-6xl font-bold text-orange-400/50 select-none">
          ToDo Pro
        </div>
      </Link>
      <SignIn signUpUrl="/sign-up" />
    </div>
  );
}
