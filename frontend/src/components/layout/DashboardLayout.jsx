import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";
import Sidebar from "../common/Sidebar";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen w-full flex-col bg-[#F5F5F4] text-zinc-900 dark:bg-[#0B0C10] dark:text-zinc-100">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}