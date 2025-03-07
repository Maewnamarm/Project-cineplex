"use client";

import React from "react";
import Image from 'next/image';

interface Movie {
  id: number;
  title: string;
  releaseDate: string;
  type: string;
  duration: string;
  posterUrl: string;
}

interface MovieCardProps {
  movie: Movie;
  showDelete?: boolean; // ควบคุมการแสดงปุ่มลบ
  onDelete?: (movieId: number) => void; // callback เมื่อกดปุ่มลบ
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, showDelete, onDelete }) => {
  // ลบ handleRedirect ที่ไปหน้า moviePage
  // const router = useRouter(); // ใช้ useRouter สำหรับการนำทาง
  // const handleRedirect = () => {
  //   router.push(`/buyticket?id=${movie.id}`);
  // };

  return (
    <div style={styles.movieCard}>
      <div style={styles.imageContainer}>
        <Image
          src={movie.posterUrl}
          alt={`โปสเตอร์ของ ${movie.title}`}
          style={styles.moviePoster}
        />
        {showDelete && (
          <button
            style={styles.deleteButton}
            onClick={() => onDelete && onDelete(movie.id)}
          >
            ลบ
          </button>
        )}
      </div>
      <div style={styles.movieInfo}>
        <p style={styles.releaseDate}>{movie.releaseDate}</p>
        <h3 style={styles.movieTitle}>{movie.title}</h3>
        <p style={styles.movieType}>{movie.type}</p>
        <p style={styles.movieDuration}>{movie.duration}</p>
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
    position: "relative" as const,
  },
  imageContainer: {
    position: "relative" as const,
  },
  moviePoster: {
    width: "100%",
    height: "300px",
    objectFit: "cover" as const,
    cursor: "pointer", // ยังสามารถคลิกได้ แต่ไม่ไปที่หน้าอื่น
  },
  deleteButton: {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#d9534f",
    color: "white",
    border: "none",
    borderRadius: "50%",
    width: "60px",
    height: "60px",
    fontSize: "1rem",
    cursor: "pointer",
    zIndex: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  movieInfo: {
    padding: "10px",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
  },
  releaseDate: {
    margin: 0,
    fontSize: "0.9rem",
  },
  movieTitle: {
    margin: "5px 0",
  },
  movieType: {
    margin: 0,
    fontSize: "0.9rem",
  },
  movieDuration: {
    margin: 0,
    fontSize: "0.9rem",
  },
};

export default MovieCard;
