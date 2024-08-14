import "./App.css";
import { useState } from "react";

import ImportButton from "./components/ImportButton";
import DataDisplay from "./components/DataDisplay";
import Result from "./components/Result/Result";
import TrieSVG from "./components/TrieVisualization/TrieSVG";

function App() {
  const [data, setData] = useState(null);
  const [result, setResult] = useState(null);
  const [automaton, setAutomaton] = useState(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  return (
    <>
      <div className="min-h-screen w-full bg-white flex flex-col items-center font-mono">
        <p className="text-2xl my-2">Aho-Corasick Text Finder</p>
        <ImportButton
          setData={setData}
          setResult={setResult}
          setAutomaton={setAutomaton}
          setHighlightedIndex={setHighlightedIndex}
        />
        <DataDisplay data={data} />
        <TrieSVG automaton={automaton} />
        <Result
          data={data}
          result={result}
          highlightedIndex={highlightedIndex}
          setHighlightedIndex={setHighlightedIndex}
        />
      </div>
      <div className="text-gray-400 font-light fixed bottom-0 right-0 m-4">
        13522137
      </div>
    </>
  );
}

export default App;
