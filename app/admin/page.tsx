"use client";

import React, { useEffect, useState } from "react";
import MovieCard from "../admin/MovieCard";
import "./admind.css";
import Navbar from "@/components/ForAdmin/NavbarAM";
import Footter from "@/components/Footter";

const MoviePage: React.FC = () => {
  const initialCategories = [
    {
      title: "ภาพยนตร์แนะนำ",
      movies: [
        {
          id: 1,
          title: "หลานม่า",
          releaseDate: "01 FEB 2024",
          type: "Drama",
          duration: "120 นาที",
          posterUrl:
            "https://storage-wp.thaipost.net/2024/02/S__25862218_0.jpg",
        },
        {
          id: 2,
          title: "ธี่หยด",
          releaseDate: "01 FEB 2024",
          type: "Horror",
          duration: "120 นาที",
          posterUrl:
            "https://thethaiger.com/th/wp-content/uploads/2023/10/%E0%B8%98%E0%B8%B5%E0%B8%AB%E0%B8%A2%E0%B8%94-%E0%B8%93%E0%B9%80%E0%B8%94%E0%B8%8A%E0%B8%99%E0%B8%8D%E0%B8%87.jpg",
        },
      ],
    },
    {
      title: "กำลังฉาย",
      movies: [
        {
          id: 3,
          title: "หลานม่า",
          releaseDate: "01 FEB 2024",
          type: "Drama",
          duration: "120 นาที",
          posterUrl:
            "https://storage-wp.thaipost.net/2024/02/S__25862218_0.jpg",
        },
        {
          id: 4,
          title: "ธี่หยด",
          releaseDate: "01 FEB 2024",
          type: "Horror",
          duration: "120 นาที",
          posterUrl:
            "https://thethaiger.com/th/wp-content/uploads/2023/10/%E0%B8%98%E0%B8%B5%E0%B8%AB%E0%B8%A2%E0%B8%94-%E0%B8%93%E0%B9%80%E0%B8%94%E0%B8%8A%E0%B8%99%E0%B8%8D%E0%B8%87.jpg",
        },
      ],
    },
    {
      title: "โปรแกรมหน้า",
      movies: [
        {
          id: 5,
          title: "หลานม่า",
          releaseDate: "01 FEB 2024",
          type: "Drama",
          duration: "120 นาที",
          posterUrl:
            "https://storage-wp.thaipost.net/2024/02/S__25862218_0.jpg",
        },
        {
          id: 6,
          title: "ธี่หยด",
          releaseDate: "01 FEB 2024",
          type: "Horror",
          duration: "120 นาที",
          posterUrl:
            "https://thethaiger.com/th/wp-content/uploads/2023/10/%E0%B8%98%E0%B8%B5%E0%B8%AB%E0%B8%A2%E0%B8%94-%E0%B8%93%E0%B9%80%E0%B8%94%E0%B8%8A%E0%B8%99%E0%B8%8D%E0%B8%87.jpg",
        },
      ],
    },
  ];

  const [categories, setCategories] = useState(initialCategories);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  // ฟังก์ชันในการลบหนัง
  const handleDeleteMovie = (categoryTitle: string, movieId: number) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) => {
        if (category.title === categoryTitle) {
          return {
            ...category,
            movies: category.movies.filter((movie) => movie.id !== movieId),
          };
        }
        return category;
      })
    );
  };

  // สลับโหมดลบ
  const toggleDeleteMode = () => {
    setIsDeleteMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    const isMoviePage = sessionStorage.getItem("isMoviePage");
    if (isMoviePage === "true") {
      sessionStorage.setItem("isMoviePage", "false");
    } else {
      sessionStorage.setItem("isMoviePage", "true");
      window.location.reload();
    }
  }, []);

  return (
    <div className="page">
      <Navbar />
      <br />
      <br />
      {categories.map((category, index) => (
        <div key={index}>
          <header className="header">
            <h2 className="categoryTitle">{category.title}</h2>
            <div
              className={
                category.title === "ภาพยนตร์แนะนำ"
                  ? "borderLineF"
                  : category.title === "กำลังฉาย"
                  ? "borderLineS"
                  : "borderLineT"
              }
            ></div>
            {category.title === "ภาพยนตร์แนะนำ" && (
              <button className="selectMovieButton" onClick={toggleDeleteMode}>
                {isDeleteMode ? "เสร็จสิ้น" : "เลือก/ลบ ภาพยนตร์"}
              </button>
            )}
          </header>
          <div className="movieList">
            {category.movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                showDelete={isDeleteMode}
                onDelete={() => handleDeleteMovie(category.title, movie.id)}
              />
            ))}
          </div>
        </div>
      ))}
      <Footter />
    </div>
  );
};

export default MoviePage;
