"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';

interface MovieProps {
  id: number;
  title: string;
  releaseDate: string;
  type: string;
  duration: string;
  posterUrl: string;
}

interface MovieCardProps {
  movie: MovieProps;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push(`/buyticket?id=${movie.id}`);
  };

  return (
    <div style={styles.movieCard}>
      <Image src={movie.posterUrl} alt={movie.title} style={styles.moviePoster} />
      <div style={styles.movieInfo}>
        <h3>{movie.title}</h3>
        <p>ประเภท: {movie.type}</p>
        <p>ความยาว: {movie.duration}</p>
        <p>ฉายวันแรก: {movie.releaseDate}</p>
        <button
          className="registerButton"
          type="button"
          onClick={handleRedirect}
          style={styles.button}
        >
          ซื้อตั๋ว
        </button>
      </div>
    </div>
  );
};

const styles = {
  movieCard: {
    backgroundColor: "#2c2c2c",
    borderRadius: "10px",
    overflow: "hidden",
    width: "200px",
    margin: "10px",
    textAlign: "center" as const,
  },
  moviePoster: {
    width: "100%",
    height: "300px",
    objectFit: "cover" as const,
  },
  movieInfo: {
    padding: "10px",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center" as const,
    color: "#fff",
  },
  button: {
    marginTop: "10px",
    padding: "8px 12px",
    backgroundColor: "#D6BB56",
    color: "black",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default MovieCard;
