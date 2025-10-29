// utils/findNodeByPath.js
export function findNodeByPath(nodes, pathInput) {
  let searchPath;
  
  // Handle array of path parts
  if (Array.isArray(pathInput)) {
    searchPath = pathInput.reduce((acc, part) => {
      if (!isNaN(part)) {
        // It's an array index
        return acc + `[${part}]`;
      } else {
        // It's a property key
        return acc ? `${acc}.${part}` : part;
      }
    }, '');
  } else {
    // Handle string path - keep as is
    searchPath = pathInput;
  }
  
  console.log('🔍 Final search path:', searchPath);
  
  // Find exact match
  const matchedNode = nodes.find(node => {
    const nodePath = node.data.path;
    console.log('  Comparing:', nodePath, '===', searchPath);
    return nodePath === searchPath;
  });
  
  if (matchedNode) {
    console.log('✅ Found node:', matchedNode.id, matchedNode.data);
  }
  
  return matchedNode;
}

export function findValueByPath(obj, path) {
  // Remove 'root.' prefix if present
  const cleanPath = path.replace(/^root\.?/, '');
  
  // Convert array notation [0] → .0 and split
  const keys = cleanPath
    .replace(/\[(\w+)\]/g, ".$1")
    .replace(/^\./, "")
    .split(".");

  let current = obj;
  for (let key of keys) {
    if (current && Object.prototype.hasOwnProperty.call(current, key)) {
      current = current[key];
    } else if (Array.isArray(current)) {
      const index = Number(key);
      if (!isNaN(index) && current[index] !== undefined) {
        current = current[index];
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
  return current;
}