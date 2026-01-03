"use client";

import ReduxProvider from "./ReduxProvider";
import Navbar from "./Components/Shared/Navbar";

export default function ClientLayout({ children }) {
  return (
    <ReduxProvider>
      <div>
        <Navbar />
        {children}
      </div>
    </ReduxProvider>
  );
}
