import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; 
import todoLogo from "../assets/todo.png";
import { Link, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../pages";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);

  console.log("Redux isLoggedIn:", isLoggedIn, "User:", user);

  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate("/signin");
  };

  return (
    <div className="h-14">
      <nav className="fixed top-0 left-0 w-full bg-gray-900 h-14 flex items-center justify-between px-6 shadow-md z-50">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={todoLogo} alt="To-Do Logo" className="h-8 w-8" />
          <span className="text-xl font-bold text-white">To-Do</span>
        </div>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-6 text-white items-center">
          <li
            className="cursor-pointer hover:text-blue-400"
            onClick={() => navigate("/")}
          >
            Home
          </li>

          {/* ✅ show only if logged in */}
          {isLoggedIn && (
            <Link className="cursor-pointer hover:text-blue-400" to={"/todo"}>
              Your To-Do
            </Link>
          )}

          {!isLoggedIn && (
            <>  
              <li>
                <button
                  className="px-4 py-1 rounded bg-white text-gray-900 hover:bg-gray-300 shadow"
                  onClick={() => navigate("/signin")}
                >
                  Login
                </button>
              </li>
              <li>
                <button
                  className="px-4 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 shadow"
                  onClick={() => navigate("/signup")}
                >
                  Signup
                </button>
              </li>
            </>
          )}

          {isLoggedIn && (
            <li>
              <button
                className="px-4 py-1 rounded bg-purple-500 text-white hover:bg-purple-600 shadow"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          )}
        </ul>

        {/* Hamburger for mobile */}
        <div
          className="md:hidden text-white text-2xl cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <ul className="absolute top-14 left-0 w-full bg-gray-800 flex flex-col items-center gap-6 py-6 text-white md:hidden">
            <li
              className="cursor-pointer hover:text-blue-400"
              onClick={() => {
                navigate("/");
                setIsOpen(false);
              }}
            >
              Home
            </li>

            {/* ✅ only show when logged in */}
            {isLoggedIn && (
              <li
                className="cursor-pointer hover:text-blue-400"
                onClick={() => {
                  navigate("/todo");
                  setIsOpen(false);
                }}
              >
                Your To-Do
              </li>
            )}
            
            {!isLoggedIn && (
              <>
                <li>
                  <button
                    className="px-4 py-1 rounded bg-white text-gray-900 hover:bg-gray-300 shadow"
                    onClick={() => {
                      navigate("/signin");
                      setIsOpen(false);
                    }}
                  >
                    Login
                  </button>
                </li>
                <li>
                  <button
                    className="px-4 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 shadow"
                    onClick={() => {
                      navigate("/signup");
                      setIsOpen(false);
                    }}
                  >
                    Signup
                  </button>
                </li>
              </>
            )}

            {isLoggedIn && (
              <li>
                <button
                  className="px-4 py-1 rounded bg-purple-500 text-white hover:bg-purple-600 shadow"
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
