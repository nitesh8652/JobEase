import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();
  const { setShowRecruiterLogin } = useContext(AppContext);

  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <nav className="bg-white shadow-md px-4 md:px-10 h-16 flex items-center justify-between sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img
          src={assets.mobileview}
          onClick={() => navigate("/")}
          className="h-10 cursor-pointer hidden md:block"
          alt="JobEase"
        />
        <img
          src={assets.mobileview}
          onClick={() => navigate("/")}
          className="h-8 cursor-pointer md:hidden"
          alt="JobEase"
        />
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6 text-sm font-medium">
        {user ? (
          <>
            <Link
              to="/application"
              className="hover:text-[#00b3c7] transition"
            >
              Applied Jobs
            </Link>

            <button
              onClick={() => navigate("/resume/yourid")}
              className="bg-[#00b3c7] text-white px-4 py-2 rounded-lg hover:bg-[#0096a7] transition"
            >
              Resume Builder
            </button>

            <UserButton />
          </>
        ) : (
          <>
            <button
              onClick={() => setShowRecruiterLogin(true)}
              className="hover:text-[#00b3c7] transition"
            >
              Recruiter Login
            </button>

            <button
              onClick={openSignIn}
              className="bg-[#007bff] text-white px-6 py-2 rounded-full hover:bg-[#006ae0] transition"
            >
              Login
            </button>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-2xl"
        onClick={() => setMobileMenu(!mobileMenu)}
      >
        {mobileMenu ? "✖" : "☰"}
      </button>

      {/* Mobile Dropdown Menu */}
      {mobileMenu && (
        <div className="absolute top-16 right-0 w-full bg-white shadow-lg py-4 md:hidden z-40">
          <div className="flex flex-col items-center gap-4 text-sm font-medium">
            {user ? (
              <>
                <Link
                  to="/application"
                  onClick={() => setMobileMenu(false)}
                  className="hover:text-[#00b3c7] transition"
                >
                  Applied Jobs
                </Link>

                <button
                  onClick={() => {
                    navigate("/resume/yourid");
                    setMobileMenu(false);
                  }}
                  className="bg-[#00b3c7] text-white px-5 py-2 rounded-lg hover:bg-[#0096a7] transition"
                >
                  Resume Builder
                </button>

                <UserButton />
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setShowRecruiterLogin(true);
                    setMobileMenu(false);
                  }}
                  className="hover:text-[#00b3c7] transition"
                >
                  Recruiter Login
                </button>

                <button
                  onClick={() => {
                    openSignIn();
                    setMobileMenu(false);
                  }}
                  className="bg-[#007bff] text-white px-6 py-2 rounded-full hover:bg-[#006ae0] transition"
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
