"use client";
import Head from 'next/head';
import React, { useState } from "react";

const MovieForm = () => {
  const [showtimes, setShowtimes] = useState([{ id: 1, time: "" }]);
  const [selectedDubbing, setSelectedDubbing] = useState<string | null>(null); // สำหรับพากย์
  const [selectedTag, setSelectedTag] = useState<string | null>(null); // สำหรับแท็ก
  const [image, setImage] = useState<File | null>(null); // สำหรับเก็บไฟล์รูปภาพที่เลือก

  const toggleSelection = (item: string, type: "dubbing" | "tag") => {
    if (type === "dubbing") {
      setSelectedDubbing((prev) => (prev === item ? null : item)); // สำหรับพากย์
    } else {
      setSelectedTag((prev) => (prev === item ? null : item)); // สำหรับแท็ก
    }
  };

  // ฟังก์ชันสำหรับเพิ่มรอบฉาย
  const handleAddShowtime = () => {
    setShowtimes([...showtimes, { id: showtimes.length + 1, time: "" }]);
  };

  // ฟังก์ชันสำหรับจัดการการเลือกรูป
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]); // เก็บไฟล์รูปภาพที่เลือก
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-900 to-black text-white p-8">
      <div className="max-w-4xl mx-auto bg-black bg-opacity-50 p-6 rounded-lg">
        <h1 className="text-xl font-bold mb-6">เพิ่มภาพยนตร์</h1>
        <form className="grid grid-cols-2 gap-6">
          {/* Left Section */}
          <div className="space-y-4 mb-6 flex flex-col items-center">
            <div className="w-64 h-80 bg-gray-700 flex items-center justify-center rounded mb-2">
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Selected"
                  className="w-full h-full object-cover rounded"
                />
              ) : (
                "รูป"
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden" // ซ่อน input file
            />
            <button
              type="button"
              className="bg-gray-800 py-1 px-3 rounded mt-2"
              onClick={() => document.querySelector('input[type="file"]')?.click()}
            >
              เพิ่มรูป
            </button>
          </div>

          {/* Right Section */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm">ชื่อเรื่อง</label>
              <input
                type="text"
                className="w-full bg-gray-800 text-white p-2 rounded border border-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm">หมวดหมู่</label>
              <input
                type="text"
                className="w-full bg-gray-800 text-white p-2 rounded border border-gray-700"
              />
            </div>
            <div className="flex space-x-4">
              <div>
                <label className="block text-sm">เวลา</label>
                <input
                  type="number"
                  className="w-full bg-gray-800 text-white p-2 rounded border border-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm">นาที</label>
                <input
                  type="text"
                  disabled
                  value="นาที"
                  className="w-full bg-gray-700 text-white p-2 rounded border border-gray-600"
                />
              </div>
            </div>

            {/* PAKY Section (Buttons) */}
            <div>
              <label className="block text-sm">พากย์</label>
              <div className="flex space-x-4">
                {["TH", "EN", "subTH"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleSelection(item, "dubbing")}
                    className={`${
                      selectedDubbing === item ? "bg-blue-500" : "bg-gray-800"
                    } py-1 px-3 rounded`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Tag Section (Buttons) */}
            <div>
              <label className="block text-sm">แท็ก</label>
              <div className="flex space-x-4">
                {["ยอดนิยม", "กำลังฉาย", "โปรแกรมหน้า"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleSelection(item, "tag")}
                    className={`${
                      selectedTag === item ? "bg-blue-500" : "bg-gray-800"
                    } py-1 px-3 rounded`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* โรงภาพยนตร์ Section with Images */}
          <div className="col-span-2">
            <label className="block text-sm">โรงภาพยนตร์</label>
            <div className="grid grid-cols-2 gap-4">
              {[
                "เวสตรา ซินีเพล็กซ์ พารากอน",
                "เวสตรา ซินีเพ็อกซ์ เซ็นทรัล ลาดพร้าว",
                "เวสตรา ซินีเพล็กซ์ เซ็นทรัล บางนา",
                "เวสตรา ซินีเพ็กซ์ เซ็นทรัลเวิลด์",
              ].map((item, index) => (
                <div key={item} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="mr-2 w-6 h-6 border-2 rounded-full border-gray-700 accent-blue-500"
                  />
                  <img
                    src="https://i.imgur.com/Vfm7Jyr.png"
                    alt={item}
                    className="w-12 h-12"
                  />
                  <label>{item}</label>
                </div>
              ))}
            </div>
          </div>

          {/* วันที่ฉายและสิ้นสุดวันฉาย */}
          <div className="col-span-2">
            <label className="block text-sm">วันที่ฉาย</label>
            <input
              type="date"
              className="w-full bg-gray-800 text-white p-2 rounded border border-gray-700"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm">สิ้นสุดวันฉาย</label>
            <input
              type="date"
              className="w-full bg-gray-800 text-white p-2 rounded border border-gray-700"
            />
          </div>

          {/* รอบฉาย (เวลา) */}
          <div className="col-span-2">
            <label className="block text-sm">รอบฉาย (เวลา)</label>
            {showtimes.map((showtime, index) => (
              <div key={showtime.id} className="flex space-x-4 mb-2">
                <input
                  type="time"
                  className="bg-gray-800 text-white p-2 rounded border border-gray-700"
                />
                {index === showtimes.length - 1 && (
                  <button
                    type="button"
                    onClick={handleAddShowtime}
                    className="bg-gray-800 py-1 px-3 rounded text-white"
                  >
                    เพิ่มรอบ
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-red-700 py-2 rounded font-bold text-white"
            >
              เพิ่มหนัง
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MovieForm;
