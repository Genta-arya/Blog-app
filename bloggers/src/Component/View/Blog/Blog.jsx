import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import logo from "../../../Asset/Header.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { login, getPostings } from "../../Service/Api";
import Navbar from "./Navbars";
import Footer from "./Footer";

const SearchNavbar = ({ setCategoryFilter, setSearchQuery, postings }) => {
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showGalleryDropdown, setShowGalleryDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Artikel");
  const [selectedGallery, setSelectedGallery] = useState("Gallery");
  const categories = [...new Set(postings.map((posting) => posting.category))];

  const toggleCategoryDropdown = () => {
    setShowCategoryDropdown(!showCategoryDropdown);
  };

  const toggleGalleryDropdown = () => {
    setShowGalleryDropdown(!showGalleryDropdown);
  };

  const handleCategoryFilter = (category) => {
    setCategoryFilter(category);
    setSelectedCategory(category);
    setShowCategoryDropdown(false);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  return (
    <nav className="bg-green-800 py-2 px-4 pb-6 sticky top-0 z-10">
      <div className="container mx-auto flex flex-col sm:flex-row items-center">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Telusuri....."
            className="bg-white text-gray-800 rounded-l px-4 py-2 focus:outline-none"
            onChange={handleSearch}
          />
          <div className="bg-white text-gray-800 rounded-r px-4 py-2 ml-0 focus:outline-none">
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </div>
        {isMobile ? (
          <div className="flex flex-row mt-2 sm:mt-0">
            <div className="relative sm:ml-4 pr-2">
              <button
                className="bg-white text-gray-800 px-4 py-2 rounded focus:outline-none"
                onClick={toggleCategoryDropdown}
              >
                {selectedCategory} <FontAwesomeIcon icon={faChevronDown} />
              </button>

              {showCategoryDropdown && (
                <div className="absolute bg-white mt-2 py-2 w-32 rounded shadow-lg">
                  <Link
                    to="/blog"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={() => handleCategoryFilter("Semua")}
                  >
                    Semua
                  </Link>
                  {categories.map((category) => (
                    <Link
                      key={category}
                      to={`/blog/?category=${category}`}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                      onClick={() => handleCategoryFilter(category)}
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <div className="relative sm:ml-4">
              <button
                className="bg-white text-gray-800 px-4 py-2 rounded focus:outline-none"
                onClick={toggleGalleryDropdown}
              >
                {selectedGallery} <FontAwesomeIcon icon={faChevronDown} />
              </button>

              {showGalleryDropdown && (
                <div className="absolute bg-white mt-2 py-2 w-32 rounded shadow-lg">
                  <Link
                    to="/blog"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={() => {
                      setShowGalleryDropdown(false);
                    }}
                  >
                    Foto
                  </Link>
                  <Link
                    to="/blog"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={() => {
                      setShowGalleryDropdown(false);
                    }}
                  >
                    Video
                  </Link>
                  <Link
                    to="/blog"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={() => {
                      setShowGalleryDropdown(false);
                    }}
                  >
                    Tausiyah
                  </Link>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex ml-4">
            <div className="relative">
              <button
                className="bg-white text-gray-800 px-4 py-2 rounded focus:outline-none"
                onClick={toggleCategoryDropdown}
              >
                {selectedCategory} <FontAwesomeIcon icon={faChevronDown} />
              </button>

              {showCategoryDropdown && (
                <div className="absolute bg-white mt-2 py-2 w-32 rounded shadow-lg">
                  <Link
                    to="/blog"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={() => handleCategoryFilter("Semua")}
                  >
                    Semua
                  </Link>
                  {categories.map((category) => (
                    <Link
                      key={category}
                      to={`/blog/?category=${category}`}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                      onClick={() => handleCategoryFilter(category)}
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <div className="relative ml-4">
              <button
                className="bg-white text-gray-800 px-4 py-2 rounded focus:outline-none"
                onClick={toggleGalleryDropdown}
              >
                {selectedGallery} <FontAwesomeIcon icon={faChevronDown} />
              </button>

              {showGalleryDropdown && (
                <div className="absolute bg-white mt-2 py-2 w-32 rounded shadow-lg">
                  <Link
                    to="/"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={() => {
                      setShowGalleryDropdown(false);
                    }}
                  >
                    Foto
                  </Link>
                  <Link
                    to="/"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={() => {
                      setShowGalleryDropdown(false);
                    }}
                  >
                    Video
                  </Link>
                  <Link
                    to="/"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={() => {
                      setShowGalleryDropdown(false);
                    }}
                  >
                    Tausiyah
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const formatDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString(undefined, options);
};

const BlogPage = () => {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [postings, setPostings] = useState([]);
  const [filteredPostings, setFilteredPostings] = useState([]);

  useEffect(() => {
    const fetchPostings = async () => {
      try {
        const postingsData = await getPostings();
        setPostings(postingsData);
        setFilteredPostings(postingsData);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPostings();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filteredData = postings;

      if (categoryFilter !== "" && categoryFilter !== "Semua") {
        filteredData = filteredData.filter(
          (posting) => posting.category === categoryFilter
        );
      }

      if (searchQuery !== "") {
        filteredData = filteredData.filter((posting) =>
          posting.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setFilteredPostings(filteredData);
    };

    applyFilters();
  }, [categoryFilter, searchQuery, postings]);

  const limitContent = (content, limit) => {
    if (content.length <= limit) {
      return content;
    }
    return content.slice(0, limit) + "...";
  };

  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset;

    if (scrollTop > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`flex flex-col min-h-screen ${isScrolled ? 'navbar-fixed' : ''}`}>
      <Navbar />
      <SearchNavbar
        setCategoryFilter={setCategoryFilter}
        setSearchQuery={setSearchQuery}
        postings={postings}
      />
      <div className="container mx-auto py-8 flex-grow">
        {filteredPostings.length === 0 ? (
          <p className="text-center text-gray-600">
            Artikel tidak ditemukan.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center p-5">
            {filteredPostings.map((posting) => (
              <div
                key={posting.id}
                className="bg-white shadow-md rounded-md overflow-hidden"
              >
                {posting.image ? (
                  <img
                    src={posting.image}
                    alt={posting.title}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <img
                    src="https://via.placeholder.com/300x200"
                    alt="Placeholder Image"
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <Link
                    to={{
                      pathname: `/detail/${posting.id}`,
                      state: { category: posting.category },
                    }}
                  >
                    <h2 className="text-xl font-bold mb-2 hover:text-green-500">
                      {posting.title}
                    </h2>
                  </Link>

                  <p className="text-gray-600 text-sm mb-2">
                    By {posting.author} | {formatDate(posting.date)}
                  </p>
                  <p className="text-gray-800">
                    {limitContent(posting.isi, 100)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;
