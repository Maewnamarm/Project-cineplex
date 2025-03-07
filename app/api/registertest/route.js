import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { sendOTPEmail } from '@/utils/sendEmail'; // ✅ ฟังก์ชันส่งอีเมล

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    // ✅ อ่านข้อมูล JSON
    const body = await req.json();  
    const username = body?.username?.trim() || 'Guest'; // ให้ default เป็น "Guest"
    const email = body?.email?.trim();
    const password = body?.password?.trim();

    // ✅ ตรวจสอบว่า email และ password ต้องมีค่า
    if (!email || !password) {  
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // ✅ สร้างรหัส OTP 6 หลัก
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // ✅ ตั้งค่าหมดอายุ OTP (10 นาที)
    const otpExpiration = new Date();
    otpExpiration.setMinutes(otpExpiration.getMinutes() + 10);

    // ✅ Hash รหัสผ่าน
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ บันทึกข้อมูลผู้ใช้ลงฐานข้อมูล (ไม่มี `null`) แต่ไม่ต้องเก็บตัวแปร
    await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        otp,
        otpExpiration,
        isVerified: false,
      },
    });

    // ✅ ส่งอีเมล OTP (ตรวจสอบ email ก่อน)
    if (email) {
      await sendOTPEmail(email, otp);
    }

    return NextResponse.json({ message: 'User registered & OTP sent' }, { status: 201 });

  } catch {
    console.error('Error registering user:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
