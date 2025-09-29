import { assets } from "../assets/assets";

export default function Footer() {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 w-full text-sm text-slate-500 bg-white pt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-6 border-borderColor">
        <div className="sm:col-span-2 lg:col-span-1">
          <a href="/">
            <img src={assets.logo} alt="Logo" />
          </a>
          <p className="text-sm/7 mt-6">
            Premium car rental service with a wide selection of luxury and
            everyday vehicles for all your driving needs
          </p>
        </div>
        <div className="flex flex-col lg:items-center lg:justify-center">
          <div className="flex flex-col text-sm space-y-2.5">
            <h2 className="font-semibold mb-5 text-gray-800">Quick Links</h2>
            <a className="hover:text-slate-600 transition" href="#">
              Home{" "}
            </a>
            <a className="hover:text-slate-600 transition" href="#">
              Browse Cars
            </a>
            <a className="hover:text-slate-600 transition" href="#">
              List Your cars
            </a>
            <a className="hover:text-slate-600 transition" href="#">
              About us
            </a>
          </div>
        </div>
        <div>
          <h2 className="font-semibold text-gray-800 mb-5">Follow us</h2>
          <div className="text-sm space-y-6 max-w-sm">
            <div className="flex items-center gap-3 mt-6">
              <a href="#">
                <img
                  src={assets.facebook_logo}
                  alt="Facebook"
                  className="w-5 h-5"
                />
              </a>
              <a href="#">
                <img
                  src={assets.instagram_logo}
                  alt="Facebook"
                  className="w-5 h-5"
                />
              </a>
              <a href="#">
                <img
                  src={assets.facebook_logo}
                  alt="Facebook"
                  className="w-5 h-5"
                />
              </a>
              <a href="#">
                <img
                  src={assets.twitter_logo}
                  alt="Facebook"
                  className="w-5 h-5"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <p className="py-4 text-center border-t mt-6 border-slate-200">
        Copyright {new Date().getFullYear()} ©{" "}
        <a
          href="https://www.linkedin.com/in/aymane-kabti-52782a304/"
          target="_blank"
        >
          Aymane Kabti
        </a>{" "}
        All Right Reserved.
      </p>
    </footer>
  );
}
