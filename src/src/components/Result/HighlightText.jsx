import React from "react";

const mergeRanges = (ranges) => {
  if (ranges.length === 0) return [];

  ranges.sort((a, b) => a.start - b.start);

  const merged = [ranges[0]];

  for (let i = 1; i < ranges.length; i++) {
    const last = merged[merged.length - 1];
    const current = ranges[i];

    if (current.start <= last.end + 1) {
      last.end = Math.max(last.end, current.end);
    } else {
      merged.push(current);
    }
  }
  // console.log(merged);
  return merged;
};

const HighlightText = ({ text, positions }) => {
  // console.log(positions);
  if (!positions || positions.length === 0) return text;

  const mergedPositions = mergeRanges(positions);

  const parts = [];
  let lastIndex = 0;

  mergedPositions.forEach((pos, index) => {
    const { start, end } = pos;
    parts.push(text.slice(lastIndex, start));
    parts.push(
      <span key={index} className="bg-blue-300">
        {text.slice(start, end + 1)}
      </span>
    );
    lastIndex = end + 1;
  });

  parts.push(text.slice(lastIndex));
  return <>{parts}</>;
};

export default HighlightText;
