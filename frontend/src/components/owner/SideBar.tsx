import { NavLink, useLocation } from "react-router-dom";
import { assets, ownerMenuLinks } from "../../assets/assets";
import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

export default function SideBar() {
  const { user, axios, setUser } = useAppContext();
  const location = useLocation().pathname;
  const [image, setImage] = useState<Blob | File | null>();

  const updateImage = async () => {
    const formData = new FormData();
    if (image) {
      formData.append("image", image);
      axios
        .patch("/update-profile", formData)
        .then((result) => {
          setUser({ ...user, image: URL.createObjectURL(image) });
          toast.success(result.data.message);
          setImage(null);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }
  };
  return (
    <div className="relative min-h-screen md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-borderColor text-sm">
      <div className="group relative">
        <label htmlFor="image">
          <img
            src={image ? URL.createObjectURL(image) : user?.image || assets.user_profile}
            alt="Profile Image"
            className="h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto"
          />
          <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
          setImage(e.target.files[0]);
              }
            }}
          />
          <div className="absolute hidden top-0 right-0 left-0 bottom-0 bg-black/10 rounded-full group-hover:flex items-center justify-center cursor-pointer">
            <img src={assets.edit_icon} alt="" loading="lazy" />
          </div>
        </label>
      </div>
      {image && (
        <button
          onClick={updateImage}
          className="absolute top-0 right-0 flex gap-2 bg-primary/10 text-primary cursor-pointer p-2"
        >
          Save <img src={assets.check_icon} width={13} alt="" loading="lazy" />
        </button>
      )}
      <p className="mt-2 text-base max-md:hidden">{user?.name}</p>
      <div className="w-full">
        {ownerMenuLinks.map((link, index) => (
          <NavLink
            to={link.path}
            key={index}
            className={`relative flex  items-center gap-2 w-full py-3 pl-4 first:mt-6 ${
              location === link.path
                ? "bg-primary/10 text-primary"
                : "text-gray-600"
            }`}
          >
            <img
              src={location === link.path ? link.coloredIcon : link.icon}
              alt="car icon"
              loading="lazy"
            />
            <span className="max-md:hidden">{link.name}</span>
            <div
              className={`${
                location === link.path && "bg-primary"
              } w-1.5 h-8 rounded-l right-0 absolute `}
            ></div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
