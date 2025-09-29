import { Outlet } from "react-router-dom";
import NavBarOwner from "../../components/owner/NavBarOwner";
import SideBar from "../../components/owner/SideBar";

export default function Layout() {
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
