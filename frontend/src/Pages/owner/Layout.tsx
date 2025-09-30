import { Outlet } from "react-router-dom";
import NavBarOwner from "../../components/owner/NavBarOwner";
import SideBar from "../../components/owner/SideBar";
import { useAppContext } from "../../context/AppContext";
import { useEffect } from "react";

export default function Layout() {
  const { isOwner, navigate } = useAppContext();

  useEffect(() => {
    if (!isOwner) navigate("/");
  }, [isOwner]);
  return (
    <div className="flex flex-col">
      <NavBarOwner />
      <div className="flex">
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
}
