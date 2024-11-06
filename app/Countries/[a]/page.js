"use client";
import { useState,useEffect } from "react";
import LeftMenu from "../../../components/leftMenu";
import Header from "@/components/Header";
import CountryCard from "../../../components/countryCard";
const countries = ({ params }) => {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const { a } = params;
  useEffect(() => {
    setSelectedCountries([a]);
  }, [params]);
  const handleCountrySelect = (countries) => {
    setSelectedCountries(countries);
  };
  return (
    <>
      <Header />
      <div className="flex md:flex-row flex-col gap-2 px-5 md:px-0 container mx-auto max-w-6xl mt-3">
        <div className="basis-1/4">
          <LeftMenu params={a} onSelect={handleCountrySelect} dataType="area" />
        </div>
        <div className="basis-3/4">
          <CountryCard filter={selectedCountries} />
        </div>
      </div>
    </>
  );
};

export default countries;
