"use client"; // บอกให้ Next.js รู้ว่านี่คือ Client Component

import React from "react";
import Image from 'next/image';

interface Movie {
  id: number;
  title: string;
  releaseDate: string;
  type: string;
  duration: string;
  posterUrl?: string; // ทำให้ optional
}

interface MovieCardNowProps {
  movie?: Movie; // ทำให้เป็น optional เผื่อว่า prop อาจเป็น undefined
}

const MovieCardNow: React.FC<MovieCardNowProps> = ({ movie }) => {
  if (!movie) {
    // แสดงข้อความเมื่อไม่มีข้อมูล movie
    return <div>ไม่พบข้อมูลภาพยนตร์</div>;
  }

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "https://via.placeholder.com/200x300?text=No+Image";
  };

  return (
    <div style={styles.movieCard}>
      <Image
        src={movie.posterUrl || "https://via.placeholder.com/200x300?text=No+Image"} // ใช้ fallback image
        alt={`โปสเตอร์ของ ${movie.title}`}
        style={styles.moviePoster}
        onError={handleImageError}
      />
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
    width: "180px", // ปรับขนาดความกว้างให้เล็กลง
    margin: "10px",
    height: "350px", // ปรับความสูงให้สั้นลง
  },
  moviePoster: {
    width: "100%",
    height: "250px", // ปรับความสูงของภาพให้สั้นลง
    objectFit: "cover",
  },
  movieInfo: {
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    textAlign: "left",
    height: "calc(100% - 250px)", // ปรับให้เนื้อหาของการ์ดแสดงภายในพื้นที่ที่เหลือ
  },
  releaseDate: {
    margin: "0",
    fontSize: "0.8rem", // ปรับขนาดตัวอักษรให้เล็กลง
    color: "#ccc",
  },
  movieTitle: {
    fontSize: "1.1rem", // ปรับขนาดตัวอักษรให้เล็กลง
    fontWeight: "bold",
    margin: "5px 0",
    color: "white",
    whiteSpace: "nowrap", // จำกัดไม่ให้ข้อความยาวเกินไป
    overflow: "hidden",
    textOverflow: "ellipsis", // แสดง "..." เมื่อข้อความยาวเกิน
  },
  movieType: {
    margin: "5px 0",
    fontSize: "0.8rem", // ปรับขนาดตัวอักษรให้เล็กลง
    color: "#ccc",
  },
  movieDuration: {
    margin: "5px 0",
    fontSize: "0.8rem", // ปรับขนาดตัวอักษรให้เล็กลง
    color: "#ccc",
  },
};

export default MovieCardNow;
