import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import logo from "../../../Asset/Header.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { login, getPostings } from "../../Service/Api";
import Navbar from "../Blog/Navbars";
import Footer from "../Blog/Footer";
import Bg from "../../../Asset/bg.jpg";
import JadwalSholat from "./JadwalSholat";
import LatestArticle from "./LatestArticle";
import ImageCarousel from "./ImageCarousel";
import VideoPlayer from "./VideoPlayer";
import { useSpring, animated } from "react-spring";

import { scroller } from "react-scroll";
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
                    to="/"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={() => handleCategoryFilter("Semua")}
                  >
                    Semua
                  </Link>
                  {categories.map((category) => (
                    <Link
                      key={category}
                      to={`/?category=${category}`}
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
                    to="/"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={() => handleCategoryFilter("Semua")}
                  >
                    Semua
                  </Link>
                  {categories.map((category) => (
                    <Link
                      key={category}
                      to={`/?category=${category}`}
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

const Home = () => {
  const [showHeader, setShowHeader] = useState(false);
  useEffect(() => {
    // Add a slight delay for the content animation to start after the header animation
    setTimeout(() => {
      scroller.scrollTo("header", {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart",
      });
    }, 200);
  }, []);
  return (
    <div>
      <Navbar />
      <header
        id="header" // Give the header element an ID
        className={`py-16 px-8 text-center text-white p-5 ${
          showHeader ? "header-enter header-enter-active" : "header-exit"
        }`}
        style={{
          backgroundImage: `url(${Bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "500px",
        }}
      ></header>
      <div
        id="content-section" // Give the content section an ID
        className="container mx-auto py-8 p-5"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border rounded-lg shadow-lg p-8">
          <div className="">
            <img
              src="https://bit.ly/3Q4ds6N"
              alt="NU Image"
              className="rounded-lg shadow-md "
            />
            <div>
              <JadwalSholat />
            </div>
            <div>
              <LatestArticle />
            </div>
            <div className="-mt-44">
              <VideoPlayer />
            </div>
          </div>

          <div className="ml-12">
            <h2 className="text-3xl font-bold mb-4">Tentang NU</h2>
            <p className="text-gray-800">
              Nahdlatul Ulama (NU) menganut paham Ahlussunah Wal Jama'ah, sebuah
              pola pikir yang mengambil jalan tengah antara ekstrim aqli
              (rasionalis) dengan kaum ekstrim naqli (skripturalis). Karena itu
              sumber pemikiran bagi NU tidak hanya Al-Qur'an, Sunnah, tetapi
              juga menggunakan kemampuan akal ditambah dengan realitas empirik.
              Cara berpikir semacam itu dirujuk dari pemikir terdahulu, seperti
              Abu Hasan Al-Asy'ari dan Abu Mansur Al-Maturidi dalam bidang
              teologi. Kemudian dalam bidang fikih mengikuti empat madzhab;
              Hanafi, Maliki, Syafi'i, dan Hanbali. Sementara dalam bidang
              tasawuf, mengembangkan metode Al-Ghazali dan Junaid Al-Baghdadi,
              yang mengintegrasikan antara tasawuf dengan syariat.
            </p>
            <p className="text-gray-800">
              Gagasan kembali ke khittah pada tahun 1984, merupakan momentum
              penting untuk menafsirkan kembali ajaran Ahlussunnah Wal Jamaah,
              serta merumuskan kembali metode berpikir, baik dalam bidang fikih
              maupun sosial. Serta merumuskan kembali hubungan NU dengan negara.
              Gerakan tersebut berhasil membangkitkan kembali gairah pemikiran
              dan dinamika sosial dalam NU.
            </p>
            <h2 className="text-3xl font-bold mb-4 mt-5">Basis Pendukung</h2>
            <p className="text-gray-800">
              Jumlah warga Nahdlatul Ulama (NU) atau basis pendukungnya
              diperkirakan mencapai lebih dari 40 juta orang, dari beragam
              profesi. Sebagian besar dari mereka adalah rakyat jelata, baik di
              kota maupun di desa. Mereka memiliki kohesifitas yang tinggi
              karena secara sosial-ekonomi memiliki masalah yang sama, selain
              itu mereka juga sangat menjiwai ajaran Ahlusunnah Wal Jamaah. Pada
              umumnya mereka memiliki ikatan cukup kuat dengan dunia pesantren
              yang merupakan pusat pendidikan rakyat dan cagar budaya NU.
            </p>
            <p className="text-gray-800">
              Basis pendukung NU ini mengalami pergeseran, sejalan dengan
              pembangunan dan perkembangan industrialisasi. Warga NU di desa
              banyak yang bermigrasi ke kota memasuki sektor industri. Jika
              selama ini basis NU lebih kuat di sektor pertanian di pedesaan,
              maka saat ini, pada sektor perburuhan di perkotaan, juga cukup
              dominan. Demikian juga dengan terbukanya sistem pendidikan, basis
              intelektual dalam NU juga semakin meluas, sejalan dengan cepatnya
              mobilitas sosial yang terjadi selama ini.
            </p>
            <h2 className="text-3xl font-bold mb-4 mt-5">Dinamika</h2>
            <p className="text-gray-800">
              Prinsip-prinsip dasar yang dicanangkan Nahdlatul Ulama (NU) telah
              diterjemahkan dalam perilaku kongkrit. NU banyak mengambil
              kepeloporan dalam sejarah bangsa Indonesia. Hal itu menunjukkan
              bahwa organisasi ini hidup secara dinamis dan responsif terhadap
              perkembangan zaman. Prestasi NU antara lain:
            </p>
            <ul className="list-disc list-inside text-gray-800">
              <li>
                Menghidupkan kembali gerakan pribumisasi Islam, sebagaimana
                diwariskan oleh para walisongo dan pendahulunya.
              </li>
              <li>
                Mempelopori perjuangan kebebasan bermadzhab di Mekah, sehingga
                umat Islam sedunia bisa menjalankan ibadah sesuai dengan madzhab
                masing-masing.
              </li>
              <li>
                Mempelopori berdirinya Majlis Islami A'la Indonesia (MIAI) tahun
                1937, yang kemudian ikut memperjuangkan tuntutan Indonesia
                berparlemen.
              </li>
              <li>
                Memobilisasi perlawanan fisik terhadap kekuatan imperialis
                melalui Resolusi Jihad yang dikeluarkan pada tanggal 22 Oktober
                1945.
              </li>
              <li>
                Berubah menjadi partai politik, yang pada Pemilu 1955 berhasil
                menempati urutan ketiga dalam peroleh suara secara nasional.
              </li>
              <li>
                Memprakarsai penyelenggaraan Konferensi Islam Asia Afrika (KIAA)
                1965 yang diikuti oleh perwakilan dari 37 negara.
              </li>
              <li>
                Memperlopori gerakan Islam kultural dan penguatan civil society
                di Indonesia sepanjang dekade 90-an.
              </li>
            </ul>
            <h2 className="text-3xl font-bold mb-4 mt-5">Tujuan Organisasi</h2>
            <p className="text-gray-800">
              Menegakkan ajaran Islam menurut paham Ahlussunnah Wal Jama'ah di
              tengah-tengah kehidupan masyarakat, di dalam wadah Negara Kesatuan
              Republik Indonesia (NKRI)
            </p>
            <h2 className="text-3xl font-bold mb-4 mt-5">Usaha Organisasi</h2>
            <ul className="list-disc list-inside text-gray-800">
              <li>
                Di bidang agama, melaksanakan dakwah Islamiyah dan meningkatkan
                rasa persaudaraan yang berpijak pada semangat persatuan dalam
                perbedaan.
              </li>
              <li>
                Di bidang pendidikan, menyelenggarakan pendidikan yang sesuai
                dengan nilai-nilai Islam, untuk membentuk muslim yang bertakwa,
                berbudi luhur, berpengetahuan luas.
              </li>
              <li>
                Di bidang sosial-budaya, mengusahakan kesejahteraan rakyat serta
                kebudayaan yang sesuai dengan nilai ke-Islaman dan kemanusiaan.
              </li>
              <li>
                Di bidang ekonomi, mengusahakan pemerataan kesempatan untuk
                menikmati hasil pembangunan, dengan mengutamakan berkembangnya
                ekonomi rakyat.
              </li>
              <li>
                Mengembangkan usaha lain yang bermanfaat bagi masyarakat luas.
              </li>
            </ul>
            <h2 className="text-3xl font-bold mb-4 mt-5">
              Struktur Organisasi
            </h2>
            <p className="text-gray-800">
              Nahdlatul Ulama memiliki struktur organisasi dengan beberapa
              tingkatan, yaitu:
            </p>
            <ul className="list-disc list-inside text-gray-800">
              <li>Pengurus Besar (tingkat Pusat)</li>
              <li>Pengurus Wilayah (tingkat Propinsi)</li>
              <li>Pengurus Cabang (tingkat Kabupaten/Kota)</li>
              <li>Majelis Wakil Cabang (tingkat Kecamatan)</li>
              <li>Pengurus Ranting (tingkat Desa/Kelurahan)</li>
            </ul>
            <p className="text-gray-800">
              Untuk tingkat Pusat, Wilayah, Cabang, dan Majelis Wakil Cabang,
              setiap kepengurusan terdiri dari:
            </p>
            <ul className="list-disc list-inside text-gray-800">
              <li>Mustasyar (Penasehat)</li>
              <li>Syuriah (Pimpinan Tertinggi)</li>
              <li>Tanfidziyah (Pelaksana Harian)</li>
            </ul>
            <p className="text-gray-800">
              Untuk tingkat Ranting, setiap kepengurusan terdiri dari:
            </p>
            <ul className="list-disc list-inside text-gray-800">
              <li>Syuriaah (Pimpinan tertinggi)</li>
              <li>Tanfidziyah (Pelaksana harian)</li>
            </ul>
            <h2 className="text-3xl font-bold mb-4 mt-5">Jaringan</h2>
            <p className="text-gray-800">
              Hingga akhir tahun 2000, jaringan organisasi Nahdlatul Ulama (NU)
              meliputi:
            </p>
            <ul className="list-disc list-inside text-gray-800">
              <li>31 Pengurus Wilayah</li>
              <li>339 Pengurus Cabang</li>
              <li>12 Pengurus Cabang Istimewa</li>
              <li>2.630 Majelis Wakil Cabang</li>
              <li>37.125 Pengurus Ranting</li>
            </ul>
            <h2 className="text-3xl font-bold mb-4 mt-5">Lembaga</h2>
            <p className="text-gray-800">
              Lembaga adalah perangkat departementasi organisasi Nahdlatul Ulama
              yang berfungsi sebagai pelaksana kebijakan Nahdlatul Ulama,
              berkaitan dengan kelompok masyarakat tertentu dan/atau yang
              memerlukan penanganan khusus.
            </p>
            <p className="text-gray-800">
              Beberapa lembaga di antaranya adalah:
            </p>
            <ul className="list-disc list-inside text-gray-800">
              <li>Lembaga Dakwah Nahdlatul Ulama (LDNU)</li>
              <li>Lembaga Pendidikan Maarif Nahdlatul Ulama (LP Maarif NU)</li>
              <li>Rabithah Ma'ahid al Islamiyah Nahdlatul Ulama (RMI NU)</li>
              <li>Lembaga Perekonomian Nahdlatul Ulama (LPNU)</li>
              <li>Lembaga Pengembangan Pertanian Nahdlatul Ulama (LPPNU)</li>
              <li>Lembaga Kemaslahatan Keluarga Nahdlatul Ulama (LKKNU)</li>
              <li>
                Lembaga Kajian dan Pengembangan Sumberdaya Manusia Nahdlatul
                Ulama (LAKPESDAM NU)
              </li>
              <li>
                Lembaga Penyuluhan dan Bantuan Hukum Nahdlatul Ulama (LPBHNU)
              </li>
              <li>
                Lembaga Seni Budaya Muslimin Indonesia Nahdlatul Ulama (LESBUMI
                NU)
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="-mb-2">
        <ImageCarousel />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
