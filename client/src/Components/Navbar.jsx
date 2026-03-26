import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const { setShowRecruiterLogin } = useContext(AppContext);

  const [mobileMenu, setMobileMenu] = useState(false);
  // const showResumeButton = !location.pathname.includes('/resume');

  return (
    <nav className="bg-white shadow-md px-4 md:px-10 h-16 flex items-center justify-between sticky top-0 z-100">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img
          src={assets.mainlogo}
          onClick={() => navigate("/")}
          className="h-8 md:h-10 cursor-pointer"
          alt="JobEase"
        />

      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6 text-sm font-medium">
        {user ? (
          <>
            <Link
              to="/application"
              className="hover:text-blue-950 hover:underline transition"
            >
              Applied Jobs
            </Link>

            {!location.pathname.startsWith("/resume") && (
              <button
                onClick={() => navigate("/resume/yourid")}
                className="group relative outline-0 [--sz-btn:35px] [--space:calc(var(--sz-btn)/5.5)]
                [--gen-sz:calc(var(--space)*2)] [--sz-text:calc(var(--sz-btn)-var(--gen-sz))]
                h-[var(--sz-btn)] w-fit px-4 border border-solid border-transparent rounded-xl
                flex items-center justify-center cursor-pointer transition-transform duration-200
                active:scale-[0.95] bg-gradient-to-r from-[#00b3c7] via-[#4de8dd] to-[#00b3c7]
                [box-shadow:#3c40434d_0_1px_2px_0,#3c404326_0_2px_6px_2px,
                #0000004d_0_30px_60px_-30px,#34343459_0_-2px_6px_0_inset]"
                style={{ backgroundSize: "200% auto" }}
              >
                <svg
                  className="animate-pulse absolute z-10 overflow-visible transition-all duration-300
      text-white group-hover:scale-110 top-[calc(var(--sz-text)/7)]
      left-[calc(var(--sz-text)/7)] h-[var(--gen-sz)] w-[var(--gen-sz)]
      group-hover:h-[var(--sz-text)] group-hover:w-[var(--sz-text)]
      group-hover:left-[calc(var(--sz-text)/4)] group-hover:top-[calc(calc(var(--gen-sz))/2)]"
                  stroke="none"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576
        2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576
        2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0
        00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75
        3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0
        01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75
        0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258
        1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0
        00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625
        2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0
        01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0
        010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395
        1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0
        00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75
        0 0116.5 15z"
                  ></path>
                </svg>

                <span className="font-extrabold leading-none text-white whitespace-nowrap transition-all duration-200 group-hover:opacity-0">
                  Resume Builder
                </span>

                <span className="absolute left-[calc(var(--sz-btn))] top-1/2 -translate-y-1/2 font-extrabold leading-none text-white whitespace-nowrap opacity-0 transition-all duration-200 group-hover:opacity-100">
                  Build Now!
                </span>
              </button>
            )}


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
        <div className="absolute top-16 right-0 w-full bg-[#fafafa] shadow-lg py-3 md:hidden z-40">
          <div className="flex items-center justify-center gap-6 px-4 text-sm font-medium flex-wrap">

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
                  className="bg-[#00b3c7] text-white px-4 py-2 rounded-lg"
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
                  className="hover:text-[#00b3c7]"
                >
                  Recruiter
                </button>

                <button
                  onClick={() => {
                    openSignIn();
                    setMobileMenu(false);
                  }}
                  className="bg-[#007bff] text-white px-4 py-2 rounded-full"
                >
                  Login
                </button>
              </>
            )}

          </div>
        </div>
      )}
    </nav >
  );
};

export default Navbar;