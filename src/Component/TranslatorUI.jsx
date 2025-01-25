/* eslint-disable */
import React, { useState } from "react";
import axios from "axios";

function TranslatorUI() {
  const [inputLang, setInputLang] = useState("en");
  const [inputText, setInputText] = useState("");
  const [outputLang, setOutputLang] = useState("hi");
  const [result, setResult] = useState("");
  const languages = [
    { name: "English", code: "en" },
    { name: "Bengali", code: "bn" },
    { name: "Hindi", code: "hi" },
    { name: "Kannada", code: "kn" },
    { name: "Malayalam", code: "ml" },
    { name: "Tamil", code: "ta" },
    { name: "Telugu", code: "te" },
  ];

  const translate = async (e) => {
    setInputText(e.target.value);
    const data = await axios.get(
      `https://api.mymemory.translated.net/get?q=${inputText}&langpair=${inputLang}|${outputLang}`
    );
    setResult(data.data.responseData.translatedText);
  };

  const clearFields = () => {
    setInputText("");
    setResult("");
  };

  const convertLangs = () => {
    const temp = inputLang;
    setInputLang(outputLang);
    setOutputLang(temp);
  };

  return (
    <div className="flex flex-col items-center min-w-screen min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 p-6">
      <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-8 text-center">
        Translator
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full max-w-6xl bg-white shadow-lg rounded-xl p-6">
        {/* Input Section */}
        <div className="flex flex-col border rounded-lg p-4 bg-gray-50 shadow-sm">
          <label className="text-sm font-medium text-gray-600 mb-2">
            Input Language
          </label>
          <select
            className="mb-4 p-2 border rounded-md text-gray-700"
            value={inputLang}
            onChange={(e) => setInputLang(e.target.value)}
          >
            {languages.map((lang, i) => (
              <option key={i} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
          <textarea
            className="p-2 border rounded-md text-gray-700 h-40 lg:h-60 resize-none"
            value={inputText}
            onChange={(e) => translate(e)}
            placeholder="Enter text"
          />
        </div>

        {/* Buttons Section */}
        <div className="flex flex-col items-center justify-center gap-4">
          <button
            onClick={convertLangs}
            className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
            >
              <path d="M280-120 80-320l200-200 57 56-104 104h607v80H233l104 104-57 56Zm400-320-57-56 104-104H120v-80h607L623-784l57-56 200 200-200 200Z" />
            </svg>
          </button>
          <button
            onClick={clearFields}
            className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md shadow"
          >
            Clear
          </button>
          <button
            onClick={translate}
            className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md shadow"
          >
            Translate
          </button>
        </div>

        {/* Output Section */}
        <div className="flex flex-col border rounded-lg p-4 bg-gray-50 shadow-sm">
          <label className="text-sm font-medium text-gray-600 mb-2">
            Output Language
          </label>
          <select
            className="mb-4 p-2 border rounded-md text-gray-700"
            value={outputLang}
            onChange={(e) => setOutputLang(e.target.value)}
          >
            {languages.map((lang, i) => (
              <option key={i} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
          <div className="p-2 border rounded-md bg-white text-gray-700 h-40 lg:h-60 overflow-y-auto">
            {result}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TranslatorUI;
