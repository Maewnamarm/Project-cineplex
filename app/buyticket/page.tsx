"use client";

import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/navigation"; // นำเข้า useRouter
import "./buyticket.css";
import Image from 'next/image';

const StepProgressBar = () => {
  return (
    <div className="flex items-center justify-center w-full py-4 bg-gradient-to-b from-[#9D8527] to-[#D6BB56]">
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-black text-white">1</div>
        <p className="text-black mt-2">เลือกรอบภาพยนตร์</p>
      </div>
      <div className="h-0.5 w-16 bg-gray-400 mx-2"></div>
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-black text-black">2</div>
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

export default function Page() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const router = useRouter(); // ใช้ useRouter() สำหรับเปลี่ยนหน้า

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
  };

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
  };

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      alert("กรุณาเลือกวันที่และเวลาที่ต้องการก่อน!");
      return;
    }
    router.push("./select"); // เปลี่ยนเส้นทางไปที่หน้า select
  };

  return (
    <>
      <Head>
        <title>Buy Ticket</title>
      </Head>

      <StepProgressBar />
      <br /><br /><br />
     
     

      <div className="header">
        {/* ส่วนหัวของหน้า */}
      </div>

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

      {/* Date Selection */}
      <div className="dateTimeSection">
        <h3>Select Date</h3>
        <div className="dateButtons">
          {["14", "15", "16", "17", "18", "19", "20", "21"].map((date, index) => (
            <button
              key={index}
              className={`dateButton1 ${selectedDate === date ? "selected" : ""}`}
              onClick={() => handleDateClick(date)}
            >
              {["thu", "fri", "sat", "sun", "mon", "tue", "wed", "thu"][index]}<br />{date}
            </button>
          ))}
        </div>
      </div>

      {/* Time Selection */}
      <div className="timeSlotsSection">
        <h3>Select Time</h3>
        <div className="timeButtons">
          {["11.30", "15.30", "19.30"].map((time) => (
            <button
              key={time}
              className={`timeButton1 ${selectedTime === time ? "selected" : ""}`}
              onClick={() => handleTimeClick(time)}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* Confirm Button */}
      <div className="confirmSection">
        <button className="confirmButton" onClick={handleConfirm}>Confirm</button>
      </div>
    </>
  );
}
