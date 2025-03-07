"use client";

import Head from 'next/head';
import React, { useState } from 'react';
import './bill.css';
import StepProgressBar from "@/components/StepProgressBar";
import Image from 'next/image';

export default function Page() {
  const [email, setEmail] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isPaymentCompleted, setIsPaymentCompleted] = useState<boolean>(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email) return; // ตรวจสอบว่าอีเมลไม่ว่าง

    // เรียก API เพื่อส่งอีเมล
    const res = await fetch('/api/sendEmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setIsSubmitted(true);
    }
  };

  const handleFinish = () => {
    setIsPaymentCompleted(true);
  };

  return (
    <>
      <StepProgressBar />
      <div className="container">
        <Head>
          <title>Buyticket</title>
        </Head>
        
        <div className="header">
          <div className='secondheader'>
            <p className='header1'>สรุปรายการสั่งชื้อ</p>
            <p className='header2'>นับถอยหลัง:9.00</p>
          </div>
        </div>

        {/* Movie Poster Section */}
        <div className="posterSection">
        <div className="posterPlaceholder">
          <Image 
            src="https://storage-wp.thaipost.net/2024/02/S__25862218_0.jpg" 
            alt="Movie Poster" 
            className="moviePoster"
          />
          </div>
          <div className="detailsSection">
            <h2>ธี่หยด</h2>
            <p>14 FEBRUARY 2024 | 11:30</p>
            <p>เวสตรา ซีนีเพล็กซ์ โลเคชั่น</p>
            <p>THEATER 1 |TH|TH</p>
            <p>ที่นั่ง</p>
            <p>ที่นั่งจำนวน</p>
          </div>
        </div>

        <div className="price">
          <h3>ราคารวมสุทธิ</h3>
          <p>160 THB</p>
        </div>

        <div className="commit">
          <h3>ยื่นยันการทำรายการ</h3>
          <form onSubmit={handleSubmit}>
            <div className="inputGroup">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            
            <button type="submit" className="submitButton" disabled={!email}>
              Submit
            </button>
          </form>
        </div>
        <br /><br /><br />
        {isSubmitted && !isPaymentCompleted && (
          <div className="confirmation">
            <Image src="/QR.png" alt="QR Code" />
            <button className="finishButton" onClick={handleFinish}>
              เสร็จสิ้น
            </button>
          </div>
        )}
        
        {isPaymentCompleted && (
          <div className="paymentCompleted">
            <p>ชำระเงินเสร็จแล้ว</p>
            <button
              className="homeButton"
              onClick={() => window.location.href = '/moviepage'} // เปลี่ยน URL ที่นี่
            >
              กลับหน้า Home
            </button>
          </div>
        )}
      </div>
    </>
  );
}
