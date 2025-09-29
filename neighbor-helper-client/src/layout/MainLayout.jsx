import React from "react";
import Navbar from "../component/Navbar";
import Sidebar from "../component/Sidebar";

export default function MainLayout({ children }) {
  return (
    <div class="flex min-h-screen">
      <Sidebar />
      <div class="flex flex-1 flex-col ml-60">
        <Navbar />
        <main class="flex-1 ">{children}</main>
      </div>
    </div>
  );
}
