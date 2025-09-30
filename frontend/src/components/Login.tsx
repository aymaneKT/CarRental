import { useState } from "react";
import type { IUser } from "../Interfaces/IUser";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

export default function Login() {
  const [state, setState] = useState<string>("login");
  const [userCredential, setUserCredential] = useState<IUser>({
    name: "",
    email: "",
    password: "",
  });
  const { setShowLogin, axios, setToken,setUser } = useAppContext();
  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(`/${state}`, {
        name: userCredential.name,
        email: userCredential.email,
        password: userCredential.password,
      })
      .then((result) => {
        localStorage.setItem("token", result.data.token);
        setToken(result.data.token);
        setShowLogin(false);
        setUser(result.data.user)
        toast.success(result.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const handleChanges = (e: any) =>
    setUserCredential({ ...userCredential, [e.target.name]: e.target.value });
  return (
    <div
      onClick={() => setShowLogin(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center text-sm text-gray-600 bg-black/50"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <p className="text-2xl font-medium m-auto">
          <span className="text-primary">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </p>
        {state === "register" && (
          <div className="w-full">
            <p>Name</p>
            <input
              onChange={(e) => handleChanges(e)}
              value={userCredential?.name}
              placeholder="type here"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
              type="text"
              required
              name="name"
            />
          </div>
        )}
        <div className="w-full ">
          <p>Email</p>
          <input
            onChange={(e) => handleChanges(e)}
            value={userCredential?.email}
            placeholder="exemple@gmail.com"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            type="email"
            required
            name="email"
          />
        </div>
        <div className="w-full ">
          <p>Password</p>
          <input
            onChange={(e) => handleChanges(e)}
            value={userCredential?.password}
            placeholder="password"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            type="password"
            required
            name="password"
          />
        </div>
        {state === "register" ? (
          <p>
            Already have account?{" "}
            <span
              onClick={() => setState("login")}
              className="text-primary cursor-pointer"
            >
              click here
            </span>
          </p>
        ) : (
          <p>
            Create an account?{" "}
            <span
              onClick={() => setState("register")}
              className="text-primary cursor-pointer"
            >
              click here
            </span>
          </p>
        )}
        <button className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-md cursor-pointer">
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
}
