import React, { useState } from "react";
import { buildTree } from "./utils/buildTree";
import { findNodeByPath } from "./utils/findNodeByPath";
import JsonInput from "./components/JsonInput";
import SearchBar from "./components/SearchBar";
import TreeView from "./components/TreeView";
import ThemeToggle from "./components/ThemeToggle";
import "./components/style.css";

export default function App() {
  const [jsonText, setJsonText] = useState(`{
  "user": {
    "id": 1,
    "name": "Suhail ulla khan",
    "address": {
      "city": "Bangaluru",
      "country": "India"
    },
    "skills": ["React", "Js", "Html", "Css"]
  }
}`);
  const [error, setError] = useState("");
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [search, setSearch] = useState("");
  const [highlightedNode, setHighlightedNode] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const handleVisualize = () => {
    try {
      console.log("📥 Raw JSON text:", jsonText);

      const json = JSON.parse(jsonText);
      console.log("✅ Parsed JSON object:", json);

      const { nodes, edges } = buildTree(json);
      console.log("🌳 Built nodes:", nodes);
      console.log("🔗 Built edges:", edges);

      setNodes(nodes);
      setEdges(edges);
      setError("");
      setHighlightedNode(null);
    } catch (e) {
      console.error("❌ JSON Parse Error:", e);
      setError("Invalid JSON: " + e.message);
    }
  };

  const handleSearch = (query) => {
  if (!query) {
    setHighlightedNode(null);
    return;
  }

  try {
    const cleanQuery = query.trim();
    
    // Auto-prepend 'root.' if not already present
    const searchPath = cleanQuery.startsWith('root.') ? cleanQuery : `root.${cleanQuery}`;
    
    console.log("🔍 Searching for:", searchPath);

    const matchedNode = findNodeByPath(nodes, searchPath);

    if (matchedNode) {
      console.log("✅ Matched node:", matchedNode.id, matchedNode.data);
      setHighlightedNode(matchedNode.id);
    } else {
      const availablePaths = nodes.map(n => n.data.path.replace('root.', '')).filter(p => p).join(", ");
      alert(`❌ Node "${cleanQuery}" not found. Available paths: ${availablePaths}`);
      setHighlightedNode(null);
    }
  } catch (e) {
    console.error("⚠️ Search error:", e);
    alert("⚠️ Invalid search query");
  }
};

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <div className="left-panel">
        <JsonInput
          jsonText={jsonText}
          setJsonText={setJsonText}
          onVisualize={handleVisualize}
          error={error}
        />
      </div>

      <div className="right-panel">
        <div className="top-bar">
          <SearchBar search={search} setSearch={setSearch} onSearch={handleSearch} />
          <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>
        <TreeView nodes={nodes} edges={edges} highlightedNode={highlightedNode} />
      </div>
    </div>
  );
}