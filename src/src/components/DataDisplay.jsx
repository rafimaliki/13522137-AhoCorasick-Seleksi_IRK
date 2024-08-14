import React from "react";

const DataDisplay = ({ data }) => {
  return data ? (
    <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 max-w-xl overflow-x-auto my-3">
      <pre className="m-0 font-mono whitespace-pre-wrap">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  ) : (
    <></>
  );
};

export default DataDisplay;
