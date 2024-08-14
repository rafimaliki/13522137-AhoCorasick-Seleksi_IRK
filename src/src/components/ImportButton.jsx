import React, { useState, useRef } from "react";
import { DataInterface } from "../class/DataInterface";
import { AhosickAutomaton } from "../function/AhosickAutomaton";

const ImportButton = ({
  setData,
  setResult,
  setAutomaton,
  setHighlightedIndex,
}) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const newFile = event.target.files[0];
    if (newFile) {
      const reader = new FileReader();
      reader.readAsText(newFile);

      reader.onload = (e) => {
        const content = e.target.result;
        const jsonData = JSON.parse(content);

        try {
          const importData = new DataInterface(jsonData);
          setData(importData);
          // console.log(importData);

          const automaton = new AhosickAutomaton(importData);
          const result = automaton.find_patterns();
          // console.log(result);

          setAutomaton(automaton);
          setResult(result);
          setHighlightedIndex(-1);
        } catch (error) {
          // console.error(error);
          alert(error.message);
        }
      };
    }
  };

  const handleClick = () => {
    fileInputRef.current.value = null;
    fileInputRef.current.click();
  };

  return (
    <div className="w-fit h-fit ">
      <input
        type="file"
        accept=".json"
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      <button
        className="p-2 bg-gray-800 hover:bg-gray-700 text-white rounded w-32 h-6 flex items-center justify-center text-center text-md"
        onClick={handleClick}
      >
        Import Data
      </button>
    </div>
  );
};

export default ImportButton;
