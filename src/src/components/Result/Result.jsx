// Result.js
import React, { useState } from "react";
import TextDisplay from "./TextDisplay";
import ResultList from "./ResultList";

const Result = ({ data, result, highlightedIndex, setHighlightedIndex }) => {
  // const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const handleResultClick = (index) => {
    setHighlightedIndex(index === highlightedIndex ? -1 : index);
  };

  return (
    <>
      {data && (
        <TextDisplay
          text={data.text}
          highlightedIndex={highlightedIndex}
          result={result}
        />
      )}
      <ResultList result={result} onResultClick={handleResultClick} />
    </>
  );
};

export default Result;
