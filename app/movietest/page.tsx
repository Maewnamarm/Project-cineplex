"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footter from "@/components/Footter";
import "./new.css";
import Image from 'next/image';

interface Movie {
  addmoive_id: number;
  tag: string;
  title: string;
  category: string;
  time: string;
  language: string;
  cinema: string;
  fdate: string;
  actor: string;
  director: string;
  resume: string;
  image_url: string;
  ldate: string;
  timer1: string;
  timer2: string;
  timer3: string;
}

export default function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch("/api/movies");
        if (!response.ok) throw new Error("Failed to fetch movies");
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  return (
    <div className="movie-container">
      <Navbar />
      <h1>Movie List</h1>
      {loading ? (
        <p>Loading movies...</p>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <div key={movie.addmoive_id} className="movie-card">
              <Image src={movie.image_url} alt={movie.title} className="movie-image" />
              <h2>{movie.title}</h2>
              <p><strong>Category:</strong> {movie.category}</p>
              <p><strong>Language:</strong> {movie.language}</p>
              <p><strong>Director:</strong> {movie.director}</p>
            </div>
          ))}
        </div>
      )}
      <Footter />
    </div>
  );
}

