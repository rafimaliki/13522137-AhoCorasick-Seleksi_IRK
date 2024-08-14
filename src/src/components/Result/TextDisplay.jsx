import React from "react";
import HighlightText from "./HighlightText";

const TextDisplay = ({ text, highlightedIndex, result }) => (
  <div className="mb-3 p-4 border border-gray-200 rounded-lg min-w-96 max-w-xl">
    <p className="text-xl font-semibold text-gray-700">
      Text{" "}
      <span className="text-sm font-light text-gray-400">
        (klik pola untuk highlight)
      </span>
    </p>
    {highlightedIndex !== -1 ? (
      <HighlightText
        text={text}
        positions={result[highlightedIndex]?.positions}
      />
    ) : (
      text
    )}
  </div>
);

export default TextDisplay;
