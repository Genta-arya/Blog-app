import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import logo from "../../../Asset/Header.png";

const Navbars = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <nav className="bg-green-800 py-4 px-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          
          <Link to="/">
            <img src={logo} alt="My Blog" className="h-12" />
          </Link>
          <div className="hidden md:block">
          {location.pathname !== "/" && (
            <Link
              to="/"
              className="   text-gray-300 hover:text-white px-3 py-2 rounded"
            >
              Beranda
            </Link>
          )}
          {location.pathname !== "/blog" && (
            <Link
              to="/blog"
              className="text-gray-300 hover:text-white px-3 py-2 rounded"
            >
              Artikel
            </Link>
          )}
            <Link
              to="/"
              className="text-gray-300 hover:text-white px-3 py-2 rounded"
            >
              Sejarah NU Ketapang
            </Link>
            {location.pathname !== "/arsip" && (
              <Link
                to="/arsip"
                className="text-gray-300 hover:text-white px-3 py-2 rounded"
              >
                Arsip
              </Link>
            )}
            <a
              href="https://www.nu.or.id/download"
              className="text-gray-300 hover:text-white px-3 py-2 rounded"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download
            </a>
          </div>
          <div className="md:hidden">
            <button
              className="text-gray-300 hover:text-white focus:outline-none"
              onClick={toggleMobileMenu}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </div>
      </div>
      {showMobileMenu && (
        <div className="fixed inset-0 flex z-50">
          <div className="flex-1 bg-gray-800 overflow-y-auto">
            <div className="container mx-auto">
              <div className="flex justify-end">
                <button
                  className="text-gray-300 hover:text-white focus:outline-none p-4"
                  onClick={toggleMobileMenu}
                >
                  <FontAwesomeIcon icon={faBars} />
                </button>
              </div>
              <div className="flex flex-col mt-8">
              {location.pathname !== "/" && (
                <Link
                  to="/"
                  className="text-gray-300 hover:text-white px-4 py-2 rounded"
                >
                  Beranda
                </Link>
              )}
               {location.pathname !== "/blog" && (
                <Link
                  to="/blog"
                  className="text-gray-300 hover:text-white px-4 py-2 rounded"
                >
                  Artikel
                </Link>
               )}

                <Link
                  to="/"
                  className="text-gray-300 hover:text-white px-4 py-2 rounded"
                >
                  Sejarah NU Ketapang
                </Link>
                {location.pathname !== "/arsip" && (
                  <Link
                    to="/arsip"
                    className="text-gray-300 hover:text-white px-4 py-2 rounded"
                  >
                    Arsip
                  </Link>
                )}

                <a
                  href="https://www.nu.or.id/download"
                  className="text-gray-300 hover:text-white px-4 py-2 rounded"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download
                </a>
              </div>
              <div className="py-4 px-6 mt-auto border-t border-gray-700">
                <p className="text-gray-300 text-sm text-center">
                  Hak Cipta © 2023 Nama Perusahaan. All rights reserved.
                </p>
              </div>
            </div>
          </div>
          <div
            className="flex-1 inset-0 bg-black opacity-50"
            onClick={toggleMobileMenu}
          ></div>
        </div>
      )}
    </nav>
  );
};

export default Navbars;
