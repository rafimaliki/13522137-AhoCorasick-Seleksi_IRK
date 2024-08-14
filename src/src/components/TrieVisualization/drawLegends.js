const drawLegends = (g, width) => {
  const legendData = [
    { color: "red", text: "Failure Link" },
    { color: "blue", text: "Dictionary Link" },
  ];

  const legend = g
    .append("g")
    .attr("class", "legend")
    .attr("transform", `translate(${width - 150}, 20)`);

  legend
    .selectAll("rect")
    .data(legendData)
    .enter()
    .append("rect")
    .attr("x", 0)
    .attr("y", (d, i) => i * 20)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", (d) => d.color);

  legend
    .selectAll("text")
    .data(legendData)
    .enter()
    .append("text")
    .attr("x", 24)
    .attr("y", (d, i) => i * 20 + 14)
    .text((d) => d.text)
    .style("font-size", "14px")
    .style("font-family", "Arial, sans-serif")
    .style("fill", "#333");
};

export default drawLegends;
