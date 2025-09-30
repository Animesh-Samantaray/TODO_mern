import React from "react";
import homebg from "../assets/homebg.jpg";

const Home = () => {
  return (
    <div className="relative h-screen w-full">
    
      <img
        src={homebg}
        alt="Home Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black opacity-40"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6 space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold">
          Manage Your To-Dos
        </h1>
        <p className="text-lg md:text-2xl">
          Don’t forget to complete your tasks.
        </p>
        <p className="text-lg md:text-2xl">
          Stay focused. Be self-motivated.
        </p>
        <button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
