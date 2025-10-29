import React from "react";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
import "reactflow/dist/style.css";

export default function TreeView({ nodes, edges, highlightedNode }) {



  const updatedNodes = nodes.map((node) => {
  const isHighlighted = node.id === highlightedNode;
  return {
    ...node,
    style: {
      ...node.style,
      border: isHighlighted
        ? "3px solid rgba(232, 56, 37, 0.9)"
        : node.style.border,
      boxShadow: isHighlighted
        ? "0 0 15px 4px rgba(99, 102, 241, 0.7)"
        : "none",
      transition: "all 0.3s ease",
      zIndex: isHighlighted ? 10 : 1,
      width:isHighlighted?'170px':'',
      height:isHighlighted?'40px':''
    },
  };
});
console.log("Highlighted Node:", highlightedNode);


  

  return (
    <div className="tree-container" style={{ width: "100%", height: "90vh" }}>
      <ReactFlow
        nodes={updatedNodes}
        edges={edges}
        fitView
        fitViewOptions={{ padding: 0.3 }}
      >
        <Background gap={20} color="#ddd" />
        <MiniMap nodeColor={() => "#6366f1"} />
        <Controls />
      </ReactFlow>
    </div>
  );
}
