"use client";

import React from "react";
import "./footter.css";
import { FaFacebook, FaYoutube, FaTwitter } from "react-icons/fa";
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <div className="footer">
      {/* Footer Logo */}
      <Image
        src="https://i.imgur.com/lgFPDON_d.png?maxwidth=520&shape=thumb&fidelity=high"
        alt="Vestra Cineplex"
        className="footerLogo"
      />
      {/* Social Icons */}
      <div className="socialIcons">
        <FaFacebook className="socialIcon" />
        <FaYoutube className="socialIcon" />
        <FaTwitter className="socialIcon" />
      </div>
    </div>
  );
};

export default Footer;
