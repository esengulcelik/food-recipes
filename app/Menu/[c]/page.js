"use client";
import { useEffect, useState } from "react";
import LeftMenu from "../../../components/leftMenu";
import Header from "@/components/Header";
import Card from "../../../components/categoryCard";

const Menu = ({ params }) => {
  const { c } = params;
  const [selectedCategories, setSelectedCategories] = useState([]);
  useEffect(() => {
    setSelectedCategories([c]);
  }, [params]);

  const handleCategorySelect = (categories) => {
    console.log(",", categories);
    setSelectedCategories(categories);
  };

  return (
    <>
      <Header />
      <div className="flex md:flex-row flex-col gap-2 px-5 md:px-0 container mx-auto max-w-6xl mt-3">
        <div className="basis-1/4">
          <LeftMenu
            params={c}
            onSelect={handleCategorySelect}
            dataType="category"
          />
        </div>
        <div className="basis-3/4">
          <Card filter={selectedCategories} />
        </div>
      </div>
    </>
  );
};

export default Menu;
