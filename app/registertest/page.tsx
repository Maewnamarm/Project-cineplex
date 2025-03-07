'use client';

import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import './registertest.css';

export default function Page() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [inputOtp, setInputOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  // ฟังก์ชันสร้าง OTP แบบสุ่ม
  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // ฟังก์ชันส่งรหัส OTP
  const handleSendCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      setMessage('กรุณากรอกอีเมล');
      return;
    }

    const generatedOtp = generateOtp();
    setOtp(generatedOtp);

    try {
      const res = await fetch('/api/otp/sendOtp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: generatedOtp }),
      });

      if (res.ok) {
        setMessage('รหัส OTP ถูกส่งไปยังอีเมลของคุณแล้ว');
      } else {
        setMessage('เกิดข้อผิดพลาดในการส่งรหัส OTP');
      }
    } catch {
      setMessage('เกิดข้อผิดพลาดในการเชื่อมต่อ');
    }
  };

  // ฟังก์ชันสมัครสมาชิก
  const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!inputOtp || inputOtp !== otp) {
      setMessage('รหัส OTP ไม่ถูกต้อง');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('รหัสผ่านไม่ตรงกัน');
      return;
    }

    try {
      const res = await fetch('/api/registertest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('สมัครสมาชิกสำเร็จ!');
        router.push('/moviepage');
      } else {
        setMessage(data.error || 'สมัครสมาชิกไม่สำเร็จ');
      }
    } catch {
      setMessage('เกิดข้อผิดพลาดในการสมัครสมาชิก');
    }
  };

  return (
    <>
      <Head>
        <title>Register Page</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="container">
        <div className="loginBox">
          <h2>Register</h2>
          <form onSubmit={handleSendCode}>
            <div className="inputGroup">
              <label>User/Email</label>
              <input
                type="text"
                placeholder="Enter your username or email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="inputGroup">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="inputGroup">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Enter your password again"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button className="sent" type="submit">Send code</button>
          </form>
          <div className="inputGroup">
            <label>A verification code has been sent to your email</label>
            <input
              type="text"
              placeholder="Verify code..."
              value={inputOtp}
              onChange={(e) => setInputOtp(e.target.value)}
            />
          </div>
          <button className="submitButton" onClick={handleSignUp}>Sign up</button>
          {message && <p>{message}</p>}
        </div>
      </div>
    </>
  );
}
