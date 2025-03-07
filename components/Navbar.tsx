"use client";  // เพิ่ม use client ที่จุดเริ่มต้นของไฟล์

import React, { useState } from "react";
import { useRouter } from "next/navigation";  // ใช้ useRouter จาก next/navigation
import "./navbar.css";  // Import the CSS file
import Image from 'next/image';

const Navbar: React.FC = () => {
  const [hover, setHover] = useState<string | null>(null);
  const [selectedLang, setSelectedLang] = useState<string>("TH");
  const [selectedLink, setSelectedLink] = useState<string>("");
  const router = useRouter();  // ใช้ useRouter จาก next/navigation

  // ฟังก์ชันสำหรับเปลี่ยนหน้าไปยังหน้า moviepage
  const handleHomeClick = () => {
    router.push("/moviepage");  // เปลี่ยนหน้าไปที่ moviepage
  };

  // ฟังก์ชันสำหรับเปลี่ยนหน้าไปยังหน้า movienow
  const handleMoviesClick = () => {
    router.push("/movienow");  // เปลี่ยนหน้าไปที่ movienow
  };

  // ฟังก์ชันสำหรับเปลี่ยนหน้าไปยัง buyticket
  const handleShowtimesClick = () => {
    router.push("/buyticket");  // เปลี่ยนหน้าไปที่ buyticket
  };

  return (
    <nav className="navbar">
      {/* Top bar */}
      <div className="topBar">
        <span className="brand">Vestra Cineplex</span>
        <div className="languageSwitch">
          <a
            href="#"
            className={selectedLang === "TH" ? "selected" : ""}
            onClick={() => setSelectedLang("TH")}
          >
            Thai
          </a>{" "}
          |{" "}
          <a
            href="#"
            className={selectedLang === "EN" ? "selected" : ""}
            onClick={() => setSelectedLang("EN")}
          >
            Eng
          </a>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="navLinksContainer">
        <ul className="navLinks">
          {["home", "movies", "cinemas", "promotions", "privacy"].map((link) => (
            <li key={link}>
              <a
                href="#"
                onClick={() => {
                  if (link === "home") handleHomeClick();
                  if (link === "movies") handleMoviesClick();
                  setSelectedLink(link);
                }}
                onMouseEnter={() => setHover(link)}
                onMouseLeave={() => setHover(null)}
                className={`navLink ${selectedLink === link || hover === link ? "active" : ""}`}
              >
                {link === "home"
                  ? "หน้าหลัก"
                  : link === "movies"
                  ? "ภาพยนตร์"
                  : link === "cinemas"
                  ? "โรงภาพยนตร์"
                  : link === "promotions"
                  ? "โปรโมชั่น"
                  : "นโยบายข้อมูลส่วนบุคคล"}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Hero Section */}
      <div className="hero">
        <h1 className="heroTitle">BUY TICKET</h1>
        <div className="verticalLine"></div>
        <div className="ticketSection">
          {/* Search for movie input */}
          <input
            className="input"
            type="text"
            placeholder="ค้นหาภาพยนตร์"
            value={selectedLink}
            onChange={(e) => setSelectedLink(e.target.value)}
          />
          <span className="atText">AT</span>
          {/* Cinema select */}
          <select className="input">
            <option value="">ค้นหาโรงภาพยนต์</option>
            <option value="cinema1">Vestra Cineplex</option>
            <option value="cinema2">Vestra Cineplex</option>
            <option value="cinema3">Vestra Cineplex</option>
          </select>
          {/* Showtimes button */}
          <button
            type="button"
            className={`button ${hover === "showtimes" ? "hovered" : ""}`}
            onMouseOver={() => setHover("showtimes")}
            onMouseOut={() => setHover(null)}
            onClick={handleShowtimesClick}  // เพิ่ม onClick ที่เรียกใช้ handleShowtimesClick
          >
            รอบฉาย
          </button>
        </div>
      </div>

      {/* Hero Image */}
      <Image
        src="https://i.imgur.com/WBQ4BUQ_d.png?maxwidth=520&shape=thumb&fidelity=high"
        alt="Cineplex"
        className="heroImage"
      />
    </nav>
  );
};

export default Navbar;
