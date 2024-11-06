"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper';
import 'swiper/swiper-bundle.css';
import { useRouter } from "next/navigation";
SwiperCore.use
    ([Autoplay, Pagination, Navigation]);

const settings = {
    spaceBetween: 20,
    slidesPerView: 4,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },
    loop: true,
    pagination: {
        clickable: true,
        el: '.swiper-pagination',
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 4,
        }
    },
};

const Country = () => {
    const [countries, setCountries] = useState([]);
    const router = useRouter()
    const areaArray = [
        { "strArea": "American", "strImg": "amerika.webp" },
        { "strArea": "British", "strImg": "british.png" },
        { "strArea": "Turkish", "strImg": "tr.webp" },
        { "strArea": "Canadian", "strImg": "kanada.webp" },
        { "strArea": "Chinese", "strImg": "cin.webp" },
        { "strArea": "Croatian", "strImg": "croa.gif" },
        { "strArea": "Dutch", "strImg": "dutch.webp" },
        { "strArea": "Egyptian", "strImg": "egy.gif" },
        { "strArea": "Filipino", "strImg": "fili.png" },
        { "strArea": "French", "strImg": "fr.webp" },
        { "strArea": "Greek", "strImg": "greek.webp" },
        { "strArea": "Indian", "strImg": "in.webp" },
        { "strArea": "Irish", "strImg": "ırısh.webp" },
        { "strArea": "Italian", "strImg": "it.webp" },
        { "strArea": "Jamaican", "strImg": "jm.webp" },
        { "strArea": "Japanese", "strImg": "jp.webp" },
        { "strArea": "Kenyan", "strImg": "kenyan.webp" },
        { "strArea": "Malaysian", "strImg": "my.webp" },
        { "strArea": "Mexican", "strImg": "mexic.gif" },
        { "strArea": "Moroccan", "strImg": "mor.gif" },
        { "strArea": "Polish", "strImg": "pol.gif" },
        { "strArea": "Russian", "strImg": "russian.webp" },
        { "strArea": "Spanish", "strImg": "es.webp" },
        { "strArea": "Thai", "strImg": "thai.webp" },
        { "strArea": "Tunisian", "strImg": "tunisian.webp" },
        { "strArea": "Ukrainian", "strImg": "ua.webp" },
        { "strArea": "Vietnamese", "strImg": "viet.webp" },
        { "strArea": "Portuguese", "strImg": "por-flag.gif" }
    ];
    const countryClick = (country) => {
        router.push("/Countries/"+country)
    }
    useEffect(() => {
        async function countryCategories() {
            try {
                const { data } = await axios.get("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
                console.log("f",data)
                setCountries(data.meals);
            } catch (error) {
                console.error(error);
            }
        }
        countryCategories();
    }, []);

    return (
        <div className="bg-gray-700">
            <div className="container mx-auto max-w-6xl mt-10 py-5">
                <div className="flex flex-col justify-center rounded-md font-lato">
                    <h2 className="font-bold text-white lg:text-2xl text-lg text-center">Foods of various countries</h2>
                    <div className="mt-10 mx-10 relative">
                        <Swiper {...settings} className="swiper-container">
                            {areaArray.map((country, index) => (
                                <SwiperSlide key={index} className="swiper-slide">
                                    <div className=" flex flex-col items-center w-full lg:h-48 h-52 bg-cover bg-center"
                                        style={{
                                            backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)), url('/images/${country.strImg}')`
                                        }}
                                    >
                                    </div>
                                    <div className="relative bottom-0 left-0 w-full bg-gray-900  p-4 text-center">
                                        <p className="font-bold text-white text-xl">{country.strArea}</p>
                                        <button onClick={()=>countryClick(country.strArea)} className="bg-orange-600 rounded-full hover:bg-orange-400 text-sm text-white p-2 mt-2">See Country Foods</button>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className="swiper-button-next absolute right-0 top-1/2 z-10 cursor-pointer"></div>
                        <div className="swiper-button-prev absolute left-0 top-1/2 z-10 cursor-pointer"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Country;
