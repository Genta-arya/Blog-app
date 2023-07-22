import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../Asset/Header.png";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../Blog/Footer";
import { getPostings } from "../../Service/Api";

const Navbar = () => {
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isPengurusDropdownOpen, setPengurusDropdownOpen] = useState(false);
  const [isPesantrenDropdownOpen, setPesantrenDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const togglePengurusDropdown = () => {
    setPengurusDropdownOpen(!isPengurusDropdownOpen);
  };

  const togglePesantrenDropdown = () => {
    setPesantrenDropdownOpen(!isPesantrenDropdownOpen);
  };

  return (
    <nav className="bg-green-800 p-4 pr-12 pl-5">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-12" />
        </div>
        <div className="hidden md:flex md:space-x-4">
          <Link
            to="/"
            className={`text-white hover:text-gray-300 ${
              location.pathname === "/" ? "text-gray-300" : ""
            }`}
          >
            Beranda
          </Link>
          {location.pathname !== "/arsip" && (
            <Link to="/arsip" className={`text-white hover:text-gray-300 `}>
              Arsip
            </Link>
          )}
          <div className="relative">
            <button
              onClick={togglePengurusDropdown}
              className={`text-white hover:text-gray-300 ${
                location.pathname === "/pengurus" ? "text-gray-300" : ""
              }`}
            >
              Pengurus
            </button>
            {isPengurusDropdownOpen && (
              <div className="absolute bg-black mt-2 w-48 text-white rounded">
                <Link
                  to="/pengurus/kepala"
                  className="block px-4 py-2 hover:text-gray-300"
                >
                  Pengurus Cabang
                </Link>
                <Link
                  to="/pengurus/wakil"
                  className="block px-4 py-2 hover:text-gray-300"
                >
                  Mantan Pengurus Cabang
                </Link>
                <Link
                  to="/pengurus/wakil"
                  className="block px-4 py-2 hover:text-gray-300"
                >
                  MWCNU Kecamatan
                </Link>
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={togglePesantrenDropdown}
              className={`text-white hover:text-gray-300 ${
                location.pathname === "/pesantren" ? "text-gray-300" : ""
              }`}
            >
              Pesantren
            </button>
            {isPesantrenDropdownOpen && (
              <div className="absolute bg-black mt-2 w-48 text-white rounded">
                <Link
                  to="/pesantren/gedung"
                  className="block px-4 py-2 hover:text-gray-300"
                >
                  Data Pondok Pesantren
                </Link>
                <Link
                  to="/pesantren/sarana"
                  className="block px-4 py-2 hover:text-gray-300"
                >
                  Profil Pondok Pesantren
                </Link>
              </div>
            )}
          </div>
          <Link
            to="/lainnya"
            className={`text-white hover:text-gray-300 ${
              location.pathname === "/lainnya" ? "text-gray-300" : ""
            }`}
          >
            Lainnya
          </Link>
        </div>
        <div className="md:hidden">
          <button
            className="text-white hover:text-gray-300 px-3 py-2 rounded"
            onClick={toggleSidebar}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </div>
      {isSidebarOpen && <Sidebar />}
    </nav>
  );
};
const Sidebar = () => {
  const location = useLocation();

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [dropdowns, setDropdowns] = useState([
    {
      title: "Pengurus",
      isOpen: false,
      links: [
        { title: "Pengurus Cabang", path: "/pengurus/kepala" },
        { title: "Mantan Pengurus Cabang", path: "/pengurus/wakil" },
        { title: "MWCNU Kecamatan", path: "/pengurus/kepala" },
      ],
    },
    {
      title: "Pesantren",
      isOpen: false,
      links: [
        { title: "Data Pondok Pesantren", path: "/pesantren/gedung" },
        { title: "Profil Pondok Pesantren", path: "/pesantren/sarana" },
      ],
    },
  ]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = (index) => {
    const updatedDropdowns = [...dropdowns];
    updatedDropdowns[index].isOpen = !updatedDropdowns[index].isOpen;
    setDropdowns(updatedDropdowns);
  };

  return (
    <div className="bg-green-800 h-screen w-48 text-white fixed top-16 left-0">
      <div className="p-4">
        <ul className="mt-8 space-y-4">
          <li>
          <Link
            to="/"
            className={`text-white hover:text-gray-300 ${
              location.pathname === "/" ? "text-gray-300" : ""
            }`}
          >
            Beranda
          </Link>
          </li>
          <li>
            {location.pathname !== "/arsip" && (
              <Link to="/arsip" className={`block hover:text-gray-300 `}>
                Arsip
              </Link>
            )}
          </li>
          {dropdowns.map((dropdown, index) => (
            <li key={index}>
              <div className="relative flex">
                <button
                  onClick={() => toggleDropdown(index)}
                  className={`block hover:text-gray-300 ${
                    location.pathname === dropdown.title.toLowerCase()
                      ? "text-gray-300"
                      : ""
                  }`}
                >
                  {dropdown.title}
                </button>
                {dropdown.isOpen && (
                  <div className="absolute bg-black mt-2 w-48 text-white rounded left-14 flex flex-col ml-5">
                    {dropdown.links.map((link, linkIndex) => (
                      <Link
                        key={linkIndex}
                        to={link.path}
                        className="block px-4 py-2 hover:text-gray-300"
                      >
                        {link.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </li>
          ))}
          <li>
            <Link
              to="/lainnya"
              className={`block hover:text-gray-300 ${
                location.pathname === "/lainnya" ? "text-gray-300" : ""
              }`}
            >
              Lainnya
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

const formatDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString(undefined, options);
};
const ArsipPage = () => {
  const [postingsByCategory, setPostingsByCategory] = useState({});

  useEffect(() => {
    const fetchPostings = async () => {
      try {
        const postings = await getPostings();

        // Membuat objek untuk menyimpan posting sesuai dengan kategori
        const postingsByCategory = {};

        // Mengelompokkan posting sesuai dengan kategori
        postings.forEach((posting) => {
          const { category } = posting;
          if (postingsByCategory[category]) {
            postingsByCategory[category].push(posting);
          } else {
            postingsByCategory[category] = [posting];
          }
        });

        setPostingsByCategory(postingsByCategory);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPostings();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8 p-5">
        {Object.keys(postingsByCategory).map((category) => (
          <div key={category} className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex ">
              Artikel : {category}
            </h2>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {postingsByCategory[category].map((posting) => (
                <div
                  key={posting.id}
                  className="bg-white shadow-md rounded-lg p-4"
                >
                  <img
                    src={`https://via.placeholder.com/400x200`}
                    alt={posting.title}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <p>
                    By {posting.author} | {formatDate(posting.date)}
                  </p>
                  <h3 className="text-lg font-bold mb-2">{posting.title}</h3>
                  <div className="mt-4 flex justify-end">
                    <Link
                      to={`/detail/${posting.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      Baca selengkapnya
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default ArsipPage;
