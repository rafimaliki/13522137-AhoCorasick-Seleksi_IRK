// ResultList.js
import React from "react";
import ResultItem from "./ResultItem";

const ResultList = ({ result, onResultClick }) => {
  if (result === null) {
    return null;
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center mt-2">
      <div className="max-w-xl">
        {result.length > 0 ? (
          result.map((value, index) => (
            <ResultItem
              key={index}
              value={value}
              index={index}
              onClick={onResultClick}
            />
          ))
        ) : (
          <p className="text-gray-500">Pola tidak ditemukan.</p>
        )}
      </div>
    </div>
  );
};

export default ResultList;
