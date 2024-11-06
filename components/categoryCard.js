import Image from "next/image";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SlArrowUp } from "react-icons/sl";
const Card = ({ filter }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter()
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) { 
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      if (filter.length > 0) {
        try {
          const allRecipes = await Promise.all(
            filter.map(async (cat) => {
              const response = await axios.get("https://www.themealdb.com/api/json/v1/1/filter.php", {
                params: { c: cat }
              });
              return response.data.meals || [];
            })
          );
          const filteredRecipes = allRecipes.flat();
          setRecipes(filteredRecipes);
        } catch (error) {
          console.error(error);
        }
      } else {
        setRecipes([]);
      }
      setLoading(false);
    };

    fetchRecipes();
  }, [filter]);
  const categoryClick = (idMeal) => {
    router.push(`/Detay/${idMeal}`); 
};
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
      {loading ? (
        <p>Yükleniyor...</p>
      ) : recipes.length > 0 ? (
        recipes.map(recipe => (
          <button key={recipe.idMeal} className="border hover:bg-gray-100 p-4 w-full h-[320px] flex gap-2 flex-col items-center">
            <div className="flex basis-1/4"> <h2 className="font-bold text-xl italic text-center">{recipe.strMeal}</h2></div>
            <div className="flex basis-2/4">  <Image src={recipe.strMealThumb} alt={recipe.strMeal} width={150} height={150} className="object-cover" /></div>
            <div className="flex basis-1/4"> <button onClick={() => categoryClick(recipe.idMeal)}  className="bg-orange-400 text-white px-6 text-xs h-8 rounded-md">See recipe details...</button></div>
          </button>
        ))
      ) : (
        <div className="flex items-center justify-center h-[500px] font-bold col-span-3">
          <p className="md:text-2xl">You haven't made a choice about food.</p>
        </div>
      )}
       <div className="fixed bottom-5 right-5">
        {isVisible && (
          <button
            onClick={scrollToTop}
            className="bg-gray-500 text-white p-3 rounded-full shadow-lg">
          <SlArrowUp className="md:w-10 md:h-10 w-5 h-5"/>
          </button>
        )}
      </div>
    </div>
  );
}

export default Card;
