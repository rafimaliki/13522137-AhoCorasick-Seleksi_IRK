const generateLinks = (nodes, automaton, links) => {
  const generatedLinks = [];

  nodes.forEach((node) => {
    const nodeId = automaton.id_of_value[node.data.name];
    const linkId = links[nodeId];

    if (linkId !== undefined) {
      const targetNode = nodes.find(
        (n) => n.data.name === automaton.value_of_id[linkId]
      );
      if (targetNode) {
        const link = { source: node, target: targetNode };
        generatedLinks.push(link);
      }
    }
  });

  return generatedLinks;
};

export default generateLinks;
