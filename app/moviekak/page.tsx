"use client";
import React, { useState } from "react";
import NavbarAM from '@/components/ForAdmin/NavbarAM';
import FooterAM from '@/components/ForAdmin/FootterAM';
import Image from 'next/image';

const MovieForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    time: "",
    language: "",
    tag: "",
    cinema: [],
    fdate: "",
    ldate: "",
    timer1: "",
    timer2: "",
    timer3: "",
    image_url: "", // ใช้เก็บลิงก์รูปภาพแทนไฟล์
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const movieData = {
      ...formData,
      time: Number(formData.time),
      fdate: formData.fdate ? new Date(formData.fdate) : null,
      ldate: formData.ldate ? new Date(formData.ldate) : null,
      timer1: formData.timer1 ? new Date(`1970-01-01T${formData.timer1}:00Z`) : null,
      timer2: formData.timer2 ? new Date(`1970-01-01T${formData.timer2}:00Z`) : null,
      timer3: formData.timer3 ? new Date(`1970-01-01T${formData.timer3}:00Z`) : null,
    };

    try {
      const res = await fetch("/api/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movieData),
      });

      if (!res.ok) throw new Error("Failed to add movie");

      alert("เพิ่มหนังสำเร็จ!");
      setFormData({
        title: "",
        category: "",
        time: "",
        language: "",
        tag: "",
        cinema: [],
        fdate: "",
        ldate: "",
        timer1: "",
        timer2: "",
        timer3: "",
        image_url: "",
      });
    } catch (error) {
      console.error("Error:", error);
      alert("เกิดข้อผิดพลาด");
    }
  };

  return (
    <>
      <NavbarAM />
      <div className="min-h-screen bg-gradient-to-b from-red-900 to-black text-white p-8">
        <div className="max-w-4xl mx-auto bg-black bg-opacity-50 p-6 rounded-lg">
          <h1 className="text-xl font-bold mb-6">เพิ่มภาพยนตร์</h1>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
            
            {/* ช่องกรอก URL รูปภาพ */}
            <div className="space-y-4 mb-6 flex flex-col items-center">
              <div className="w-64 h-80 bg-gray-700 flex items-center justify-center rounded mb-2">
                {formData.image_url ? (
                  <Image src={formData.image_url} alt="Selected" className="w-full h-full object-cover rounded" />
                ) : (
                  "ใส่ลิงก์รูปภาพ"
                )}
              </div>
              <input 
                type="text" 
                name="image_url" 
                value={formData.image_url} 
                onChange={handleChange} 
                placeholder="วางลิงก์รูปภาพที่นี่..." 
                className="w-full bg-gray-800 text-white p-2 rounded border border-gray-700 text-center"
              />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm">ชื่อเรื่อง</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full bg-gray-800 text-white p-2 rounded border border-gray-700" />
              </div>
              <div>
                <label className="block text-sm">หมวดหมู่</label>
                <input type="text" name="category" value={formData.category} onChange={handleChange} className="w-full bg-gray-800 text-white p-2 rounded border border-gray-700" />
              </div>
              <div>
                <label className="block text-sm">ระยะเวลา (นาที)</label>
                <input type="number" name="time" value={formData.time} onChange={handleChange} className="w-full bg-gray-800 text-white p-2 rounded border border-gray-700" />
              </div>
              <div>
                <label className="block text-sm">ภาษาพากย์</label>
                <input type="text" name="language" value={formData.language} onChange={handleChange} className="w-full bg-gray-800 text-white p-2 rounded border border-gray-700" />
              </div>
              <div>
                <label className="block text-sm">วันที่ฉาย</label>
                <input type="date" name="fdate" value={formData.fdate} onChange={handleChange} className="w-full bg-gray-800 text-white p-2 rounded border border-gray-700" />
              </div>
              <div>
                <label className="block text-sm">สิ้นสุดวันฉาย</label>
                <input type="date" name="ldate" value={formData.ldate} onChange={handleChange} className="w-full bg-gray-800 text-white p-2 rounded border border-gray-700" />
              </div>
              <div>
                <label className="block text-sm">รอบฉาย</label>
                <input type="time" name="timer1" value={formData.timer1} onChange={handleChange} className="w-full bg-gray-800 text-white p-2 rounded border border-gray-700" />
                <input type="time" name="timer2" value={formData.timer2} onChange={handleChange} className="w-full bg-gray-800 text-white p-2 rounded border border-gray-700" />
                <input type="time" name="timer3" value={formData.timer3} onChange={handleChange} className="w-full bg-gray-800 text-white p-2 rounded border border-gray-700" />
              </div>
            </div>

            <div className="col-span-2">
              <button type="submit" className="w-full bg-red-700 py-2 rounded font-bold text-white">
                เพิ่มหนัง
              </button>
            </div>
          </form>
        </div>
      </div>
      <FooterAM />
    </>
  );
};

export default MovieForm;
