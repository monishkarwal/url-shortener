import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [inputURL, setInputURL] = useState("http://www.xyz.com");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleClick = async () => {
    setError("");
    setResult(null);
    // eslint-disable-next-line
    const expression = /^(https?:\/\/)([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    const regex = new RegExp(expression);

    let testURL = inputURL.match(regex);
    if (!testURL) {
      setError("Please input valid URL.");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/shortener",
          {
            url: inputURL,
          }
        );
        const { data } = response;
        setResult(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <header className="bg-indigo-700 p-5 mb-8">
        <h1 className="text-white font-semibold text-2xl">URL Shortener</h1>
      </header>
      <div className="container mx-auto flex justify-between mb-8">
        <input
          type="url"
          className="flex-grow rounded  bg-indigo-100 text-xl p-2"
          name="url"
          onChange={(e) => setInputURL(e.target.value)}
          value={inputURL}
        />
        <button
          className="bg-indigo-500 rounded-lg p-3 ml-5 text-white hover:bg-indigo-600"
          onClick={handleClick}
        >
          Shorten
        </button>
      </div>
      <div className="container mx-auto bg-gray-100 p-10">
        {error && (
          <div className="bg-red-500 opacity-90 text-white p-5">{error}</div>
        )}
        {result && (
          <div>
            <p className="text-sm text-green-700 mb-5">{result.message}</p>
            <p>
              Your Shortened URL:{" "}
              <a
                className="hover:text-gray-500"
                href={`http://localhost:8000/${result.data.shortened}`}
              >{`http://localhost:8000/${result.data.shortened}`}</a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
