"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { GiChickenLeg } from "react-icons/gi";
import { FaFishFins } from "react-icons/fa6";
import { LuDessert, LuBeef } from "react-icons/lu";
import { FaPastafarianism } from "react-icons/fa";
import { MdBreakfastDining } from "react-icons/md";
import { GiGoat } from "react-icons/gi";
import { SiLamborghini, SiPorkbun } from "react-icons/si";
import { FaGlobe, FaLeaf, FaSeedling, FaAppleAlt } from "react-icons/fa";
import { TbSoupFilled } from "react-icons/tb";
import { IoIosFlag } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import { FiAlignJustify } from "react-icons/fi";

const LeftMenu = ({ onSelect, dataType, params }) => {
  const categoryIcons = {
    Seafood: <FaFishFins className="text-xl text-black" />,
    Chicken: <GiChickenLeg className="text-xl text-black" />,
    Dessert: <LuDessert className="text-xl text-black" />,
    Pasta: <FaPastafarianism className="text-xl text-black" />,
    Beef: <LuBeef className="text-xl text-black" />,
    Breakfast: <MdBreakfastDining className="text-xl text-black" />,
    Goat: <GiGoat className="text-xl text-black" />,
    Lamb: <SiLamborghini className="text-xl text-black" />,
    Miscellaneous: <FaGlobe className="text-xl text-black" />,
    Pork: <SiPorkbun className="text-xl text-black" />,
    Side: <FaLeaf className="text-xl text-black" />,
    Starter: <TbSoupFilled className="text-xl text-black" />,
    Vegan: <FaSeedling className="text-xl text-black" />,
    Vegetarian: <FaAppleAlt className="text-xl text-black" />,
  };
  const countryIcons = {
    American: (
      <img src="/images/amerika.webp" alt="American Flag" className="w-4 h-4" />
    ),
    British: (
      <img src="/images/british.png" alt="British Flag" className="w-4 h-4" />
    ),
    Turkish: (
      <img src="/images/tr.webp" alt="Turkish Flag" className="w-4 h-4" />
    ),
    Canadian: (
      <img src="/images/kanada.webp" alt="Canadian Flag" className="w-4 h-4" />
    ),
    Chinese: (
      <img src="/images/cin.webp" alt="Chinese Flag" className="w-4 h-4" />
    ),
    Croatian: (
      <img src="/images/croa.gif" alt="Croatian Flag" className="w-4 h-4" />
    ),
    Dutch: (
      <img src="/images/dutch.webp" alt="Dutch Flag" className="w-4 h-4" />
    ),
    Egyptian: (
      <img src="/images/egy.gif" alt="Egyptian Flag" className="w-4 h-4" />
    ),
    Filipino: (
      <img src="/images/fili.png" alt="Filipino Flag" className="w-4 h-4" />
    ),
    French: <img src="/images/fr.webp" alt="French Flag" className="w-4 h-4" />,
    Greek: (
      <img src="/images/greek.webp" alt="Greek Flag" className="w-4 h-4" />
    ),
    Indian: <img src="/images/in.webp" alt="Indian Flag" className="w-4 h-4" />,
    Irish: (
      <img src="/images/ırısh.webp" alt="Irish Flag" className="w-4 h-4" />
    ),
    Italian: (
      <img src="/images/it.webp" alt="Italian Flag" className="w-4 h-4" />
    ),
    Jamaican: (
      <img src="/images/jm.webp" alt="Jamaican Flag" className="w-4 h-4" />
    ),
    Japanese: (
      <img src="/images/jp.webp" alt="Japanese Flag" className="w-4 h-4" />
    ),
    Kenyan: (
      <img src="/images/kenyan.webp" alt="Kenyan Flag" className="w-4 h-4" />
    ),
    Malaysian: (
      <img src="/images/my.webp" alt="Malaysian Flag" className="w-4 h-4" />
    ),
    Mexican: (
      <img src="/images/mexic.gif" alt="Mexican Flag" className="w-4 h-4" />
    ),
    Moroccan: (
      <img src="/images/mor.gif" alt="Moroccan Flag" className="w-4 h-4" />
    ),
    Polish: <img src="/images/pol.gif" alt="Polish Flag" className="w-4 h-4" />,
    Russian: (
      <img src="/images/russian.webp" alt="Russian Flag" className="w-4 h-4" />
    ),
    Spanish: (
      <img src="/images/es.webp" alt="Spanish Flag" className="w-4 h-4" />
    ),
    Thai: <img src="/images/thai.webp" alt="Thai Flag" className="w-4 h-4" />,
    Tunisian: (
      <img
        src="/images/tunisian.webp"
        alt="Tunisian Flag"
        className="w-4 h-4"
      />
    ),
    Ukrainian: (
      <img src="/images/ua.webp" alt="Ukrainian Flag" className="w-4 h-4" />
    ),
    Vietnamese: (
      <img src="/images/viet.webp" alt="Vietnamese Flag" className="w-4 h-4" />
    ),
    Portuguese: (
      <img
        src="/images/por-flag.gif"
        alt="Portuguese Flag"
        className="w-4 h-4"
      />
    ),
    Unknown: <IoIosFlag />,
  };
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  useEffect(() => {
    setSelectedItems([params]);
    onSelect([params]);
  }, [params]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url =
          dataType === "category"
            ? "https://www.themealdb.com/api/json/v1/1/list.php?c=list"
            : "https://www.themealdb.com/api/json/v1/1/list.php?a=list";
        const response = await axios.get(url);
        setItems(response.data.meals);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [dataType]);

  const handleItemChange = (item) => {
    let updatedItems;
    if (selectedItems.includes(item)) {
      updatedItems = selectedItems.filter((selected) => selected !== item);
    } else {
      updatedItems = [...selectedItems, item];
    }
    setSelectedItems(updatedItems);
    onSelect(updatedItems);
  };
  return (
    <div>
      <button
        className="md:hidden text-gray-700 p-2 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <AiOutlineClose className="text-xl" />
        ) : (
          <FiAlignJustify className="text-xl" />
        )}
      </button>
      <div
        className={`fixed md:static inset-0 md:w-64 bg-gray-100 h-full p-4 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold mb-2 text-gray-800">
            {dataType === "category" ? "Categories" : "Countries"}
          </h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-black md:hidden"
          >
            <AiOutlineClose className="text-xl" />
          </button>
        </div>
        <div className="border-t-2 border-gray-600 mb-2"></div>
        <ul className="space-y-3">
          {items.map((item) => {
            const itemName =
              item[dataType === "category" ? "strCategory" : "strArea"];
            const icons =
              dataType === "category" ? categoryIcons : countryIcons;

            return (
              <li
                key={itemName}
                className="flex items-center text-black rounded-md p-1 hover:bg-opacity-60 hover:text-white hover:bg-orange-400"
              >
                <input
                  type="checkbox"
                  id={itemName}
                  value={itemName}
                  onChange={() => handleItemChange(itemName)}
                  checked={selectedItems.includes(itemName)}
                  className="mr-2 h-4 w-4 text-orange-600 border-orange-500 rounded focus:ring-orange-500 focus:ring-offset-2"
                />
                <label
                  htmlFor={itemName}
                  className="flex items-center text-gray-700 cursor-pointer select-none"
                >
                  <span className="mr-2">{icons[itemName]}</span>
                  {dataType === "category" ? `${itemName}` : itemName}
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default LeftMenu;
