import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router";

function AuthenticatorCom() {
  return (
    <div>
      <SignedIn>
        <div className="  border-t-2 pt-2 ">
          <UserButton showName={true}></UserButton>
        </div>
      </SignedIn>
      <SignedOut>
        <div>
          <Link to={"/sign-in"}>
            <button
              className={
                "w-full rounded-md bg-stone-600 hover:bg-stone-700 text-white p-2 "
              }
            >
              Sign In
            </button>
          </Link>
          <Link to={"/sign-up"}>
            <button className="w-full rounded-md bg-stone-600 hover:bg-stone-700 text-white p-2 mt-2 ">
              Register
            </button>
          </Link>
        </div>
      </SignedOut>
    </div>
  );
}

export default AuthenticatorCom;
