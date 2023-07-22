import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const JadwalSholat = () => {
  const [wilayah, setWilayah] = useState("");
  const [wilayahSuggestions, setWilayahSuggestions] = useState([]);
  const [tanggal, setTanggal] = useState("");
  const [jadwalSholat, setJadwalSholat] = useState(null);
  const [idWilayah, setIdWilayah] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuggestionClicked, setIsSuggestionClicked] = useState(false);

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  };

  useEffect(() => {
    setTanggal(getTodayDate());
  }, []);

  const handleSearch = () => {
    setIsLoading(true);
    const wilayahLowerCase = wilayah.toLowerCase(); // Convert to lowercase
    fetch(`https://api.myquran.com/v1/sholat/kota/semua`)
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data)) {
          // Filter suggestions based on user input
          const filteredSuggestions = data.filter((item) =>
            item.lokasi.toLowerCase().includes(wilayahLowerCase)
          );
          if (filteredSuggestions.length > 0) {
            setIdWilayah(filteredSuggestions[0].id);
            setIsSuggestionClicked(true); // Set suggestion clicked state
          } else {
            console.error("Wilayah tidak ditemukan");
            setIsLoading(false);
          }
        } else {
          console.error("Data wilayah tidak ditemukan");
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("Terjadi kesalahan:", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (idWilayah) {
      fetch(`https://api.myquran.com/v1/sholat/jadwal/${idWilayah}/${tanggal}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.status && data.status === true) {
            setJadwalSholat(data.data);
            setIsLoading(false); // Hide loading text after fetching data
          } else {
            console.error("Data jadwal sholat tidak ditemukan");
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.error("Terjadi kesalahan:", error);
          setIsLoading(false);
        });
    }
  }, [idWilayah, tanggal]);

  const handleInputChange = (event) => {
    const userInput = event.target.value;
    setWilayah(userInput);
    setIsSuggestionClicked(false); // Reset suggestion clicked state

    // Clear jadwalSholat results when the user starts a new search
    setJadwalSholat(null);

    // Fetch wilayah suggestions
    if (userInput.trim() !== "") {
      const wilayahLowerCase = userInput.toLowerCase(); // Convert to lowercase
      fetch(`https://api.myquran.com/v1/sholat/kota/semua`)
        .then((response) => response.json())
        .then((data) => {
          if (data && Array.isArray(data)) {
            // Filter suggestions based on user input
            const filteredSuggestions = data.filter((item) =>
              item.lokasi.toLowerCase().includes(wilayahLowerCase)
            );
            setWilayahSuggestions(filteredSuggestions);
          } else {
            setWilayahSuggestions([]);
          }
        })
        .catch((error) => {
          console.error("Terjadi kesalahan:", error);
          setWilayahSuggestions([]);
        });
    } else {
      setWilayahSuggestions([]);
    }
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-4">Jadwal Shalat</h1>
      <div className="mb-4 flex">
        <input
          type="text"
          value={wilayah}
          onChange={handleInputChange}
          placeholder="Cari Wilayah..."
          className="p-2 border rounded-l"
        />
        <button
          onClick={handleSearch}
          className={`px-4 py-2 bg-green-700 text-white rounded-r hover:bg-green-600 transition-opacity ${
            isLoading ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          {isLoading ? "Loading..." : <FontAwesomeIcon icon={faSearch} />}
        </button>
      </div>
      {wilayahSuggestions.length > 0 && !isSuggestionClicked && (
        <div className="max-h-60 overflow-y-auto bg-white p-4 rounded-lg shadow-md">
        <ul>
          {wilayahSuggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              onClick={() => {
                setWilayah(suggestion.lokasi);
                setIsSuggestionClicked(true); // Set suggestion clicked state
                setWilayahSuggestions([]); // Hide suggestions after selecting
              }}
              className="cursor-pointer p-2 hover:bg-gray-100"
            >
              {suggestion.lokasi}
            </li>
          ))}
        </ul>
      </div>
      )}
      {isLoading ? (
        <div>Loading...</div>
      ) : jadwalSholat ? (
        <div className="bg-white shadow-lg p-8 rounded-lg">
          <h1 className="text-3xl font-bold mb-4 flex justify-center">
            {jadwalSholat.lokasi}
          </h1>
          <div className="table-container overflow-x-auto">
            <table className="table-auto border mb-2">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Tanggal</th>
                  <th className="px-4 py-2 border">Imsak</th>
                  <th className="px-4 py-2 border">Subuh</th>
                  <th className="px-4 py-2 border">Dzuhur</th>
                  <th className="px-4 py-2 border">Ashar</th>
                  <th className="px-4 py-2 border">Maghrib</th>
                  <th className="px-4 py-2 border">Isya</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border">{jadwalSholat.jadwal.tanggal}</td>
                  <td className="px-4 py-2 border">{jadwalSholat.jadwal.imsak}</td>
                  <td className="px-4 py-2 border">{jadwalSholat.jadwal.subuh}</td>
                  <td className="px-4 py-2 border">{jadwalSholat.jadwal.dzuhur}</td>
                  <td className="px-4 py-2 border">{jadwalSholat.jadwal.ashar}</td>
                  <td className="px-4 py-2 border">{jadwalSholat.jadwal.maghrib}</td>
                  <td className="px-4 py-2 border">{jadwalSholat.jadwal.isya}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default JadwalSholat;
