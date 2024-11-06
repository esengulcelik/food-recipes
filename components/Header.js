"use client";
import { IoSearchSharp } from "react-icons/io5";
import { MdFoodBank } from "react-icons/md";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");
  const isActive = (path) => {
    return pathname === path ? "scale-x-100" : "scale-x-0";
  };

  return (
    <div className="bg-gray-700 h-28">
      <div className="container mx-auto pt-8 max-w-6xl flex flex-col lg:flex-row items-center lg:justify-between justify-normal px-3 lg:gap-10 gap-4">
        <div className="flex justify-between lg:gap-10 gap-4 w-full">
          <Link href={"/"} className="flex gap-1 items-center">
            <MdFoodBank className="w-10 h-10 text-orange-600" />
            <h1 className="text-orange-600 lg:text-3xl text-xl font-bold italic">
              FOODS
            </h1>
          </Link>
          <div className="relative flex items-center md:w-full">
            <IoSearchSharp className="absolute text-gray-300 lg:text-2xl text-sm left-3 flex items-center text-gray" />
            <form className="w-full">
              <input
                type="text"
                placeholder="Write the food you are looking for..."
                className="p-2 border lg:text-sm text-xs rounded-md bg-gray-50 lg:pl-10 pl-8 placeholder-gray-400 w-full border-gray-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </div>
        </div>
        <div className="font-bold flex gap-5 font-lato lg:text-lg text-xs text-white whitespace-nowrap">
          <Link href="/">
            <button className="relative group">
              Home
              <span
                className={`absolute left-0 bottom-0 w-full h-0.5 bg-orange-600 group-hover:scale-x-100 ${isActive(
                  "/"
                )} transition-transform duration-300`}
              ></span>
            </button>
          </Link>
          <Link href="/Menu/dessert">
            <button className="relative group">
              Categories
              <span
                className={`absolute left-0 bottom-0 w-full h-0.5 bg-orange-600 group-hover:scale-x-100 ${isActive(
                  "/Menu/dessert"
                )} transition-transform duration-300`}
              ></span>
            </button>
          </Link>
          <Link href="/Countries/british">
            <button className="relative group">
              Countries
              <span
                className={`absolute left-0 bottom-0 w-full h-0.5 bg-orange-600 group-hover:scale-x-100 ${isActive(
                  "/Countries/british"
                )} transition-transform duration-300`}
              ></span>
            </button>
          </Link>
          <Link href="/ingredients">
            <button className="relative group">
              Ingredients
              <span
                className={`absolute left-0 bottom-0 w-full h-0.5 bg-orange-600 group-hover:scale-x-100 ${isActive(
                  "/ingredients"
                )} transition-transform duration-300`}
              ></span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
