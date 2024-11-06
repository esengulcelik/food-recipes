"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

const MealsPage = () => {
  const router = useRouter();
  const { query } = router;
  const [meals, setMeals] = useState([]);

 
  useEffect(() => {
    const fetchMeals = async () => {
      if (query && query.c) {
        const category = query.c;
        try {
          const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
          if (response.data.meals) {
            setMeals(response.data.meals);
            setError(null); 
          } else {
            setMeals([]);
            setError('Bu kategoride yemek bulunamadı.'); 
          }
        } catch (error) {
          console.error(error);
          setError('Yemekleri getirirken bir hata oluştu.'); 
        }
      }
    };

    fetchMeals();
  }, [query]);

  return (
    <div>
      <h1 className="text-center text-2xl font-bold">Yemekler</h1>
      <div className="flex flex-wrap gap-5 items-center justify-center p-5">
        {meals ? (
          meals.map((meal) => (
            <div key={meal.idMeal} className="border p-3 rounded">
              <Image src={meal.strMealThumb} width={150} height={100} alt={meal.strMeal} />
              <p className="text-center">{meal.strMeal}</p>
            </div>
          ))
        ) : (
          <p className="text-center">Yemek bulunamadı.</p>
        )}
      </div>
    </div>
  );
};

export default MealsPage;
