import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

import drawNodes from "./drawNodes";
import drawLinks from "./drawLinks";
import drawLabels from "./drawLabels";
import drawLegends from "./drawLegends";

import generateLinks from "./generateLinks";

const convertTrieToD3Format = (trie, value_of_id) => {
  const convertNode = (id) => ({
    name: value_of_id[id],
    children: trie[id].map((childId) => convertNode(childId)),
  });
  return convertNode(0);
};

const TrieSVG = ({ automaton }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (automaton === null) return;

    const width = 1000;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const trie = convertTrieToD3Format(automaton.trie, automaton.value_of_id);

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .style("background", "#f0f0f0")
      .style("margin", "10px")
      .attr(
        "viewBox",
        `0 0 ${width + margin.left + margin.right} ${
          height + margin.top + margin.bottom
        }`
      )
      .attr("preserveAspectRatio", "xMinYMin meet");

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const root = d3.hierarchy(trie, (d) => d.children);

    const treeLayout = d3
      .tree()
      .size([width, height])
      .separation((a, b) => (a.parent === b.parent ? 1 : 2) / a.depth);

    treeLayout(root);

    // Handle overflow
    const nodes = root.descendants();
    const minX = d3.min(nodes, (d) => d.x);
    const maxX = d3.max(nodes, (d) => d.x);
    const minY = d3.min(nodes, (d) => d.y);
    const maxY = d3.max(nodes, (d) => d.y);

    const xOffset = (width - (maxX - minX)) / 2 - minX;
    const yOffset = (height - (maxY - minY)) / 2 - minY;

    nodes.forEach((d) => {
      d.x += xOffset;
      d.y += yOffset;
    });

    const failureLinks = generateLinks(
      nodes,
      automaton,
      automaton.failure_links
    );
    const dictionaryLinks = generateLinks(
      nodes,
      automaton,
      automaton.dictionary_links
    );

    drawLinks(
      g,
      root.links(),
      "link",
      "gray",
      "1.5px",
      null,
      null,
      "horizontal"
    );

    drawLinks(
      g,
      failureLinks,
      "failure-link",
      "red",
      "1.5px",
      "5,5",
      null,
      "vertical"
    );
    drawLinks(
      g,
      dictionaryLinks,
      "dictionary-link",
      "blue",
      "1.5px",
      "5,10",
      failureLinks,
      "vertical"
    );

    drawNodes(g, nodes, automaton);
    drawLabels(g, nodes);
    drawLegends(g, width);
  }, [automaton]);

  return <svg ref={svgRef}></svg>;
};

export default TrieSVG;
