"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Header from "@/components/Header";
import { ImYoutube2 } from "react-icons/im";
import { FaChevronCircleLeft } from "react-icons/fa";

import { useRouter } from "next/navigation";
const Detail = ({ params }) => {
  const [meal, setMeal] = useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { i } = params;
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 300;

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };
  console.log(i);
  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${i}`
        );
        setMeal(response.data.meals[0]);
        console.log(response.data.meals[0]);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    if (i) {
      fetchMealDetails();
    }
  }, [i]);
  const leftClick = () => {
    router.back();
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        {loading ? (
          <p>Yükleniyor...</p>
        ) : meal ? (
          <>
            <div className="container mx-auto p-4">
              <button
                onClick={leftClick}
                className="text-orange-600 mb-5 hover:text-orange-400"
              >
                <FaChevronCircleLeft className="w-10 h-10" />
              </button>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2">
                  <Image
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="object-cover rounded-lg shadow-lg"
                    width={500}
                    height={500}
                  />
                </div>
                <div className="md:w-1/2 bg-gray-100 p-6 rounded-lg shadow-lg">
                  <h1 className="text-3xl font-bold mb-4 italic">
                    {meal.strMeal}
                  </h1>
                  <p>
                    <strong>Category:</strong> {meal.strCategory}
                  </p>
                  <p>
                    <strong>Area:</strong> {meal.strArea}
                  </p>
                  <h2 className="text-xl font-bold mt-6">Ingredients</h2>
                  <ul className="list-disc pl-5 space-y-1">
                    {Object.keys(meal)
                      .filter(
                        (key) => key.startsWith("strIngredient") && meal[key]
                      )
                      .map((key, index) => (
                        <li key={index}>{meal[key]}</li>
                      ))}
                  </ul>
                </div>
              </div>
              <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4 underline">Recipe</h2>
                <div>
                  <p className="whitespace-pre-wrap">
                    {isExpanded
                      ? meal.strInstructions
                      : `${meal.strInstructions.slice(0, maxLength)}...`}
                  </p>
                  {meal.strInstructions.length > maxLength && (
                    <button onClick={handleToggle} className="text-blue-500">
                      {isExpanded ? "Daha azını göster" : "Devamını gör"}
                    </button>
                  )}
                </div>
                {meal.strYoutube && (
                  <div className="mt-4 mr-10 mb-5 flex justify-end ">
                    <button
                      onClick={() => window.open(meal.strYoutube, "_blank")}
                      className="bg-red-700 text-sm text-white p-1 flex gap-1 font-bold hover:bg-red-500 rounded-lg items-center"
                    >
                      <p>Watch on</p>
                      <ImYoutube2 className="w-10 h-10" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <p>Yemek bulunamadı.</p>
        )}
      </div>
    </>
  );
};

export default Detail;
