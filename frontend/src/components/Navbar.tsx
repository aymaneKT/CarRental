import { Link, useLocation, useNavigate } from "react-router-dom";
import { assets, menuLinks } from "../assets/assets";
import { useState } from "react";
export default function Navbar() {
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const [isOpenNavbar, setIsOpenNavBar] = useState<boolean>(false);
  return (
    <nav
      className={` ${
        location === "/" && "bg-light"
      } flex items-center  justify-between w-screen border-borderColor px-6 py-4 relative border-b text-gray-600 md:px-16 lg:px-24 xl:px-32`}
    >
      {/* LOGO */}
      <Link to="/ ">
        <img src={assets.logo} alt="logo" className="h-8" loading="lazy" />
      </Link>

      {/* UL  */}
      <div
        className={`${
          location === "/" ? "bg-light" : "bg-white"
        } flex  items-center max-sm:px-7 gap-5 transform  duration-500 max-sm:absolute max-sm:flex-col max-sm:items-start max-sm:top-[100%] max-sm:h-screen max-sm:left-0 max-sm:w-full
        ${isOpenNavbar ? "max-sm:left-0" : "max-sm:left-full"}
        `}
      >
        <div className="flex items-center gap-5 max-sm:flex-col max-sm:items-start">
          {menuLinks.map((element, index) => (
            <Link to={element.path} key={index}>
              {element.name}
            </Link>
          ))}
        </div>
        <div className="gap-2 border border-borderColor rounded-full px-3 max-w-56 hidden lg:flex">
          <input
            type="text"
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            placeholder="Search products"
          />
          <img src={assets.search_icon} alt="search" loading="lazy" />
        </div>
        <div className="flex gap-6 items-center">
          <button onClick={() => navigate("/owner")}>Dashboard</button>
          <button className="px-8 py-2 bg-primary hover:bg-primary-dull text-white rounded-lg">
            Login
          </button>
        </div>
      </div>
      <img
        className="block sm:hidden cursor-pointer "
        onClick={() => setIsOpenNavBar(!isOpenNavbar)}
        src={isOpenNavbar ? assets.close_icon : assets.menu_icon}
        loading="lazy"
      />
    </nav>
  );
}
