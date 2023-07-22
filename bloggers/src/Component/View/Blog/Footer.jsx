import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import logo from "../../../Asset/PCNU KETAPANG - KALBAR.png";

const Footer = () => {
  return (
    <footer className="bg-green-800 py-4 px-6 mt-auto">
      <div className="container mx-auto text-center text-gray-300">
      <img src={logo} alt="Logo" className="h-10 mx-auto mb-4" />
        <div className="flex justify-center mb-4">
          <a
            href="https://www.facebook.com/nahdlatul.ketapang"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white mx-2"
          >
            <FontAwesomeIcon icon={faFacebookSquare} size="2x" />
          </a>

          <a
            href="https://www.youtube.com/channel/UCf-J-D3j0TlFISnyvXlFcvA"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white mx-2"
          >
            <FontAwesomeIcon icon={faYoutube} size="2x" />
          </a>
        </div>
       
        <p className="text-gray-300">
          PENGURUS CABANG NAHDLATUL ULAMA (PCNU) KABUPATEN KETAPANG - KALIMANTAN
          BARAT (Sekretariat: Jalan R. Suprapto, Ketapang)
        </p>
        <span className="ml-2">NU-KETAPANG. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
