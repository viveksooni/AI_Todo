import { Route, Routes } from "react-router";
import Todo from "./components/Todo";
import { SignedIn, SignedOut, UserProfile } from "@clerk/clerk-react";
import SignInClerk from "./components/AuthComponents/SignInClerk";
import SignUpClerk from "./components/AuthComponents/SignUpClerk";
import UserName from "./components/UserName";

function App() {
  return (
    <>
      <Routes>
        {/* Todo page */}
        <Route
          path="/"
          element={
            <div className="font-[Inter]">
              <Todo></Todo>
            </div>
          }
        ></Route>
        {/* Sign in page */}
        <Route
          path="/sign-in"
          element={
            <>
              <SignedOut>
                <SignInClerk></SignInClerk>
              </SignedOut>
              <SignedIn>
                <UserProfile />
              </SignedIn>
            </>
          }
        ></Route>
        {/* sign up page */}
        <Route
          path="/sign-up"
          element={
            <>
              <SignedOut>
                <SignUpClerk></SignUpClerk>
              </SignedOut>
              <SignedIn>
                <UserProfile />
              </SignedIn>
            </>
          }
        ></Route>
        <Route path="/name" element={<UserName></UserName>} />
      </Routes>
    </>
  );
}

export default App;
