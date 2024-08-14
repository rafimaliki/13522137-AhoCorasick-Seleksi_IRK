const drawNodes = (g, nodes, automaton) => {
  g.selectAll(".node")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("class", "node")
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("r", 10)
    .style("fill", (d) =>
      automaton.is_final[automaton.id_of_value[d.data.name]]
        ? "#BDBDBD"
        : "white"
    )
    .style("stroke", "#333")
    .style("stroke-width", "1.5px");
};

export default drawNodes;
