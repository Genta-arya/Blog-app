import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostingById, getPostingByCategory } from "../../Service/Api";
import Navbar from "./Navbars";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { ArrowUpIcon } from "@heroicons/react/solid";

const DetailPage = () => {
  const { id } = useParams();
  const [posting, setPosting] = useState(null);
  const [relatedPostings, setRelatedPostings] = useState([]);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchPosting = async () => {
      try {
        const response = await getPostingById(id);
        setPosting(response);

        // Mendapatkan postingan lain dengan kategori yang sama
        if (response && response.category) {
          const relatedResponse = await getPostingByCategory(response.category);
          setRelatedPostings(relatedResponse);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPosting();
  }, [id]);

  const limitContent = (content, limit) => {
    if (content.length <= limit) {
      return content;
    }
    return content.slice(0, limit) + "...";
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-8">
        <div className="flex justify-center">
          {posting ? (
            <div className="max-w-3xl bg-white rounded-lg shadow-md p-6 mt-0 mx-auto">
              <h2 className="text-3xl font-bold mb-4">{posting.title}</h2>
              <p className="text-gray-800 mb-2">
                 By {posting.author} |{" "}
                {formatDate(posting.date)}
              </p>
              {posting.image ? (
                <img
                  src={posting.image}
                  alt={posting.title}
                  className="w-full h-auto mb-4 rounded"
                />
              ) : (
                <img
                  src="https://via.placeholder.com/400x300"
                  alt="Placeholder Image"
                  className="w-1/32 h-auto mb-4 rounded mx-auto flex justify-center items-center"
                />
              )}
              <p className="text-gray-800 leading-relaxed">
                {posting.isi.split(".").map((paragraph, index) => (
                  <React.Fragment key={index}>
                    {paragraph.trim()}
                    <br />
                    <br />
                  </React.Fragment>
                ))}
              </p>
            </div>
          ) : (
            <p className="text-gray-600">Postingan tidak ditemukan.</p>
          )}
        </div>
        {relatedPostings.length > 1 && (
          <div className="mt-8 mx-auto">
            <h2 className="text-xl font-bold mb-1 text-center">
              Artikel {posting.category} lainya
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-12">
              {relatedPostings
                .filter((post) => post.id !== posting.id) // Filter postingan saat ini
                .map((post) => (
                  <div
                    key={post.id}
                    className="bg-white rounded-lg shadow-md p-4 border border-gray-300"
                  >
                    <div className="aspect-w-2 aspect-h-3">
                      {post.image ? (
                        <img
                          src={post.image}
                          alt={post.title}
                          className="object-cover rounded"
                        />
                      ) : (
                        <img
                          src="https://via.placeholder.com/300x200"
                          alt="Placeholder Image"
                          className="object-cover rounded"
                        />
                      )}
                    </div>
                    <h3 className="text-lg font-bold mt-4 mb-2 hover:text-green-500 cursor-pointer">
                      <Link
                        to={`/detail/${post.id}`}
                        onClick={() => window.scrollTo(0, 0)}
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-2">
                      By {post.author} | {formatDate(post.date)}
                    </p>
                    <p className="text-gray-800 leading-relaxed">
                      {limitContent(post.isi, 100)}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
      <button
        className={`fixed bottom-8 right-8 bg-gray-800 text-white rounded-full p-2  mb-12 ${
          isScrolled ? "visible" : "invisible"
        }`}
        onClick={() => window.scrollTo(0, 0)}
      >
        <ArrowUpIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default DetailPage;
