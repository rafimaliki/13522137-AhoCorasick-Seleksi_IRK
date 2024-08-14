const drawLabels = (g, nodes) => {
  g.selectAll(".label")
    .data(nodes)
    .enter()
    .append("text")
    .attr("class", "label")
    .attr("x", (d) => d.x + 12)
    .attr("y", (d) => d.y + 5)
    .text((d) => d.data.name)
    .style("font-size", "14px")
    .style("font-family", "Arial, sans-serif")
    .style("fill", "#333");
};

export default drawLabels;
