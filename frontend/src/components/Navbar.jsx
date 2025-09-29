import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // icons for hamburger
import todoLogo from "../assets/todo.png";
import { useNavigate } from "react-router";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate=useNavigate();
  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 h-14 flex items-center justify-between px-6 shadow-md z-50">
     
      <div className="flex items-center gap-2">
        <img src={todoLogo} alt="To-Do Logo" className="h-8 w-8" />
        <span className="text-xl font-bold text-white">To-Do</span>
      </div>

    
      <ul className="hidden md:flex gap-6 text-white items-center">
        <li className="cursor-pointer hover:text-blue-400" onClick={()=>navigate('/')}>Home</li>
        <li className="cursor-pointer hover:text-blue-400">Your To-Do</li>
        <li>
          <button className="px-4 py-1 rounded bg-white text-gray-900 hover:bg-gray-300 shadow"
          onClick={()=>navigate('/signin')}>
            Login
          </button>
        </li>
        <li>
          <button className="px-4 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 shadow"
          onClick={()=>navigate('/signup')}>
            Signup
          </button>
        </li>
        <li>
          <button className="px-4 py-1 rounded bg-purple-500 text-white hover:bg-purple-600 shadow">
            Logout
          </button>
        </li>
      </ul>

      <div
        className="md:hidden text-white text-2xl cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>

      {isOpen && (
        <ul className="absolute top-14 left-0 w-full bg-gray-800 flex flex-col items-center gap-6 py-6 text-white md:hidden">
          <li className="cursor-pointer hover:text-blue-400" onClick={()=>{navigate('/');setIsOpen(false)}}>Home</li>
          <li className="cursor-pointer hover:text-blue-400">Your To-Do</li>
          <li>
            <button className="px-4 py-1 rounded bg-white text-gray-900 hover:bg-gray-300 shadow" onClick={()=>{navigate('/signin')
              setIsOpen(false);}
            }>
              Login
            </button>
          </li>
          <li>
            <button className="px-4 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 shadow" onClick={()=>{navigate('/signup');setIsOpen(false)}}>
              Signup
            </button>
          </li>
          <li>
            <button className="px-4 py-1 rounded bg-purple-500 text-white hover:bg-purple-600 shadow">
              Logout
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
