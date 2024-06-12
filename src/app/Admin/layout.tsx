"use client";
import React from "react";
import { useAppSelector } from "../redux/hooks";
import { useSession } from "next-auth/react";
import Login from "../components/admin/login";
import Loader from "../components/admin/loader";
import Sidebar from "../components/admin/Sidebar";
const layout = ({children}:{children:React.ReactNode}) => {
  const isLoading = useAppSelector((store) => store.loadingReducer);
  const { data: session } = useSession();

  if (!session?.user) {
    return <Login/>
  }
  return <div className="flex">
    <Sidebar/>
    <div className="w-full h-full">
    {/*<NavBar/>*/ }
    <div className="bg-gray-200 p-4 h-[calc(100vh-64px)]">{children}</div>
    </div>
    {isLoading && <Loader/>}
  </div>;
};

export default layout;
