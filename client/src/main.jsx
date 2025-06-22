import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { simple } from "@clerk/themes";
import { BrowserRouter } from "react-router";
import { Toaster } from "react-hot-toast";
import TodoContextProvider from "./Context/TodoContext.jsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/"
      appearance={{
        baseTheme: simple,
      }}
    >
      <TodoContextProvider>
        <StrictMode>
          <Toaster
            toastOptions={{
              iconTheme: {
                primary: "#713200",
                secondary: "#FFFAEE",
              },
              className:
                "!bg-orange-50 border-1 !py-4  border-stone-600 font-[Inter] shadow-lg text-white !rounded-lg",
            }}
          />
          <App />
        </StrictMode>
      </TodoContextProvider>
    </ClerkProvider>
  </BrowserRouter>
);
