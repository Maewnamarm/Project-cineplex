"use client";

import Head from "next/head";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./select.css";
import Image from 'next/image';

export default function Page() {
  const [selectedRanks, setSelectedRanks] = useState<string[]>([]);
  const router = useRouter();

  const handleRankClick = (rank: string) => {
    setSelectedRanks((prevSelectedRanks) =>
      prevSelectedRanks.includes(rank)
        ? prevSelectedRanks.filter((r) => r !== rank)
        : [...prevSelectedRanks, rank]
    );
  };
  const StepProgressBar = () => {
    return (
      <div className="flex items-center justify-center w-full py-4 bg-gradient-to-b from-[#9D8527] to-[#D6BB56]">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-black text-black">1</div>
          <p className="text-black mt-2">เลือกรอบภาพยนตร์</p>
        </div>
        <div className="h-0.5 w-16 bg-gray-400 mx-2"></div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 flex items-center justify-center rounded-full  bg-black text-white">2</div>
          <p className="text-black mt-2">เลือกที่นั่ง</p>
        </div>
        <div className="h-0.5 w-16 bg-gray-400 mx-2"></div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-black text-black">3</div>
          <p className="text-black mt-2">ชำระเงิน</p>
        </div>
      </div>
    );
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

  const goToBillPage = () => {
    if (selectedRanks.length > 0) {
      const selectedSeats = selectedRanks.join(",");
      router.push(`/bill?seat=${selectedSeats}`);
    } else {
      alert("กรุณาเลือกที่นั่งก่อนทำการซื้อตั๋ว!");
    }
  };

  return (
    
    <div className="container">
      
      <Head>
        <title>Buy Ticket</title>
      </Head>
      
      <div className="header">
        <h1></h1>
        
      </div>
      <StepProgressBar />
      
     {/* Movie Poster Section */}
     <div className="posterSection">
        <div className="posterPlaceholder">
          <Image
            src="https://storage-wp.thaipost.net/2024/02/S__25862218_0.jpg"
            alt="Movie Poster"
            className="posterImage"
          />
        </div>
        <div className="detailsSection">
          <h2>Movie Title</h2>
          <p>Director: หลานม่า</p>
          <p>Genre: Drama</p>
          <p>Duration: 120 mins</p>
        </div>
      </div>


      <div className="namerank">
        <div className="ranking">
          <button
            className={`rankButton1 ${
              selectedRanks.includes("THEATER 1") ? "selected" : ""
            }`}
            onClick={() => handleRankClick("THEATER 1")}
          >
            THEATER<br />1
          </button>
          Normal<br />90 THB
        </div>
      </div>

      <div className="screen">
        <p>SCREEN</p>
      </div>

      <div className="seat">
        {['A', 'B', 'C', 'D'].map((row) => (
          <div key={row} className="seatrank">
            <p className="nameseatf">Row {row}</p>
            <div className="seatonef">
              {[...Array(12)].map((_, i) => (
                <button
                  key={`${row}${i + 1}`}
                  className={`seatf ${
                    selectedRanks.includes(`${row} ${i + 1}`) ? "selected" : ""
                  }`}
                  onClick={() => handleRankClick(`${row} ${i + 1}`)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="selectedseat">
        <div className="secondselectseat">
          <p className="selectedseat1">Selected seat</p>
          <p className="selectedseat2">{selectedRanks.join(", ") || "None"}</p>
        </div>
      </div>

      <div className="selectedseat">
        <div className="secondselectseat">
          <p className="selectedseat1">Total price</p>
          <p className="selectedseat2">{selectedRanks.length * 90} THB</p>
        </div>
      </div>

      <div className="confirmSection">
        <button className="confirmButton" onClick={goToBillPage}>
          Buy Ticket
        </button>
      </div>
    </div>
  );
}