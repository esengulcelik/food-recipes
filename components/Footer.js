"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import Link from "next/link";
import { MdFoodBank } from "react-icons/md";
const Footer = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    async function fetchCountries() {
      try {
        const { data } = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
        );
        setCountries(data.meals);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCountries();
  }, []);

  return (
    <footer className="bg-gray-200 text-gray-800 mt-20 py-5">
      <div className="flex flex-col lg:flex-row container justify-between mx-auto max-w-6xl">
        <div className="grid grid-cols-3 w-full lg:text-base text-xs gap-2 text-start items-center font-medium px-5">
          {countries.map((country, index) => (
            <div
              key={index}
              className={`${index < 3 ? "font-bold mb-2" : "text-gray-800"}`}
            >
              {country.strArea}
            </div>
          ))}
        </div>
        <div className="h-24 text-center justify-center lg:mt-24 mt-10 flex lg:flex-col items-center">
          <Link href={"/"} className="flex items-center p-5">
            <MdFoodBank className="w-7 h-7 text-orange-600" />
            <h1 className="text-orange-600 lg:text-2xl text-xl font-bold italic">
              FOODS
            </h1>
          </Link>

          <div className="text-black p-5 flex flex-col">
            <p className="whitespace-nowrap font-bold md:text-lg text-sm">
              Follow Us
            </p>
            <div className="flex gap-2">
              <FaFacebook className="text-blue-500 w-5 h-5" />
              <FaInstagram className="text-orange-700 w-5 h-5" />
              <FaYoutube className="text-red-700 w-5 h-5" />
            </div>
          </div>
          <div className="text-black p-5 flex flex-col">
            <p className="whitespace-nowrap font-bold md:text-lg text-sm">
              Contact
            </p>
            <p className="whitespace-nowrap  md:text-lg text-sm">+2123787545</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
