import * as d3 from "d3";

const isLinkOverlap = (link1, link2) => {
  return (
    (link1.source.x === link2.source.x &&
      link1.source.y === link2.source.y &&
      link1.target.x === link2.target.x &&
      link1.target.y === link2.target.y) ||
    (link1.source.x === link2.target.x &&
      link1.source.y === link2.target.y &&
      link1.target.x === link2.source.x &&
      link1.target.y === link2.source.y)
  );
};

const drawLinks = (
  g,
  links,
  className,
  strokeColor,
  strokeWidth,
  strokeDasharray,
  overlapLinks = [],
  linkStyle
) => {
  const linkGenerator =
    linkStyle === "horizontal"
      ? d3
          .linkHorizontal()
          .x((d) => d.x)
          .y((d) => d.y)
      : d3
          .linkVertical()
          .x((d) => d.x)
          .y((d) => d.y);

  // Handle link overlap
  const adjustedLinks = links.map((link, index) => {
    if (className === "dictionary-link") {
      const overlappingLinks = overlapLinks.filter((prevLink) =>
        isLinkOverlap(link, prevLink)
      );

      const offsetX = overlappingLinks.length * 5;
      const offsetY = overlappingLinks.length * 5;

      return {
        source: {
          ...link.source,
          x: link.source.x + offsetX,
          y: link.source.y + offsetY,
        },
        target: {
          ...link.target,
          x: link.target.x + offsetX,
          y: link.target.y + offsetY,
        },
      };
    }

    return link;
  });

  // Draw link
  g.selectAll(`.${className}`)
    .data(adjustedLinks)
    .enter()
    .append("path")
    .attr("class", className)
    .attr("d", linkGenerator)
    .style("fill", "none")
    .style("stroke", strokeColor)
    .style("stroke-width", strokeWidth)
    .style("stroke-dasharray", strokeDasharray);

  // Draw arrow
  if (className !== "link") {
    g.selectAll(`.${className}-arrow`)
      .data(adjustedLinks)
      .enter()
      .append("defs")
      .append("marker")
      .attr("id", (d, i) => `${className}-arrow-${i}`)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 15)
      .attr("refY", 0)
      .attr("markerWidth", 8)
      .attr("markerHeight", 8)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .style("fill", strokeColor);

    g.selectAll(`.${className}`).attr(
      "marker-end",
      (d, i) => `url(#${className}-arrow-${i})`
    );
  }

  // Draw arrow label with last letter of target name
  // g.selectAll(`.${className}-label`)
  //   .data(adjustedLinks)
  //   .enter()
  //   .append("text")
  //   .attr("class", `${className}-label`)
  //   .attr("x", (d) => d.source.x + 10)
  //   .attr("y", (d) => d.source.y - 10)
  //   .text((d) => d.target.data.name.slice(-1))
  //   .style("font-size", "14px")
  //   .style("font-family", "Arial, sans-serif")
  //   .style("fill", "#BDBDBD");
};

export default drawLinks;
