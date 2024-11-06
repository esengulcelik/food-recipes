"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
const foods = () => {
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );
        setCategories(response.data.categories);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  const categoryClick = (category) => {
    const categoryName =
      category.strCategory.charAt(0).toUpperCase() +
      category.strCategory.slice(1);
    router.push(`/Menu/${categoryName}`);
  };

  return (
    <>
      <div className="container mx-auto max-w-6xl lg:mt-10 mt-5">
        <div className="flex flex-col justify-center rounded-md font-lato">
          <div className="flex items-center lg:pl-5 pl-10">
            <span className="h-8 w-1 bg-orange-600"></span>
            <h2 className="font-bold lg:text-2xl text-lg text-center ml-2">
              Types of Food
            </h2>
          </div>
          <div className="flex flex-wrap gap-5 items-center justify-center p-5">
            {categories.map((category) => (
              <button
                onClick={() => categoryClick(category)}
                key={category.idCategory}
                className="flex lg:w-1/4 w-1/3 p-5 flex-col border border-gray-400 items-center rounded-md"
              >
                <Image
                  objectFit="cover"
                  src={category.strCategoryThumb}
                  width={150}
                  height={100}
                  className="overflow-hidden transition-transform transform hover:scale-125"
                />
                <p className="font-semibold lg:text-base text-xs">
                  {category.strCategory}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default foods;
