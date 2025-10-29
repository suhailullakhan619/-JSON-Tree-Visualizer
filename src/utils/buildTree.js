import { findNodeByPath } from "./findNodeByPath";
import { findValueByPath } from "./findNodeByPath";
export function buildTree(json, xGap = 250, yGap = 100) {
  const nodes = [];
  const edges = [];
  let index = 0;
  const levelCount = {};

  function traverse(value, key = "root", depth = 0, parentId = null, fromArray = false, arrayIndex = null, path = "") {
    const id = `${key}_${index++}`;

    if (!levelCount[depth]) levelCount[depth] = 0;
    const position = {
      x: depth * xGap,
      y: levelCount[depth] * yGap,
    };
    levelCount[depth]++;

    const isArray = Array.isArray(value);
    const isObject = typeof value === "object" && value !== null && !isArray;

    let label;
    let currentPath = path;
    
    if (fromArray && arrayIndex !== null && (isObject || isArray)) {
      label = `[${arrayIndex}]`;
      currentPath = path + `[${arrayIndex}]`;
    } else if (fromArray && !isObject && !isArray) {
      label = String(value);
      currentPath = path + `[${arrayIndex}]`;
    } else if (key !== "root") {
      label = key;
      currentPath = path ? `${path}.${key}` : key;
    } else {
      label = key;
      currentPath = "root";
    }

    const style = {
      background: isObject
        ? "#e0e7ff"
        : isArray
        ? "#dcfce7"
        : fromArray
        ? "#fef3c7"
        : "#f1f5f9",
      border: isObject
        ? "2px solid #6366f1"
        : isArray
        ? "2px solid #16a34a"
        : fromArray
        ? "2px solid #f59e0b"
        : "1px solid #94a3b8",
      borderRadius: 8,
      padding: 10,
      minWidth: 80,
      textAlign: "center",
      fontWeight: 500,
    };

    nodes.push({
      id,
      position,
      data: { label, value, key, path: currentPath },
      style
    });

    if (parentId) {
      edges.push({
        id: `${parentId}->${id}`,
        source: parentId,
        target: id,
        style: { stroke: "#94a3b8" },
        animated: true,
      });
    }

    if (isObject) {
      for (const [childKey, childVal] of Object.entries(value)) {
        traverse(childVal, childKey, depth + 1, id, false, null, currentPath);
      }
    } else if (isArray) {
      value.forEach((item, idx) => {
        traverse(item, key, depth + 1, id, true, idx, currentPath);
      });
    }
  }

  traverse(json);
  return { nodes, edges };
}

export function getNodePath(node) {
  return node.data.path || "";
}

const jsonData = {
  "user": {
    "id": 101,
    "name": "Alice Johnson"
  },
  "orders": [
    {
      "orderId": "ORD-001",
      "items": [
        { "name": "Laptop", "price": 1200 },
        { "name": "Mouse", "price": 25 }
      ]
    }
  ]
};
const { nodes } = buildTree(jsonData);

// Find node by path
const targetNode = findNodeByPath(nodes, "orders[0].items[1].name");
console.log('targetNode',targetNode); // The node object

// Find value from original JSON
const value = findValueByPath(jsonData, "orders[0].items[1].name");
console.log('value',value); // "Mouse" or whatever the value i