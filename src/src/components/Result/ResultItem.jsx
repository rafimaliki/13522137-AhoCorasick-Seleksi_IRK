import React from "react";

const ResultItem = ({ value, index, onClick }) => (
  <div
    key={index}
    className="mb-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 transition duration-200"
    onClick={() => onClick(index)}
  >
    <p className="text-xl font-semibold text-gray-700">
      Pola: <span className="text-blue-600">{value.pattern}</span>
    </p>
    <p className="text-gray-600">Ditemukan {value.positions.length}x</p>
    <p className="text-gray-500">
      Indeks:{" "}
      <span className="font-mono">
        [{value.positions.map((pos) => `(${pos.start}, ${pos.end})`).join(", ")}
        ]
      </span>
    </p>
  </div>
);

export default ResultItem;
