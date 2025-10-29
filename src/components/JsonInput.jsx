import React from "react";

export default function JsonInput({ jsonText, setJsonText, onVisualize, error,darkMode }) {

  return (
    <div className={`json-input ${darkMode?'dark':''}`}>
      <h2 className="title">JSON Tree Visualizer</h2>
      <label>Paste or type JSON data</label>
      <textarea
        value={jsonText}
        onChange={(e) => setJsonText(e.target.value)}
        rows={12}
        className={`json-textarea ${darkMode ? "dark" : ""}`}
      />
      {error && <p className="error-text">{error}</p>}
      <button onClick={onVisualize} className="generate-btn">Generate Tree</button>
      
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'left',padding:10,gap:'30px'}}>
      <div style={{display:'flex',flexDirection:'row',gap:'20px',width:'100%'}}><span style={{width:'80px',height:'20px',background:"#e0e7ff",border:"2px solid #6366f1",borderRadius:'6px'}}></span> is for Object</div>
      <div style={{display:'flex',flexDirection:'row',gap:'20px',width:'100%'}}><span style={{width:'80px',height:'20px',background:"#dcfce7",border:"2px solid #16a34a",borderRadius:'6px'}}></span> is for Array</div>
      <div style={{display:'flex',flexDirection:'row',gap:'20px',width:'100%'}}><span style={{width:'80px',height:'20px',background:"#fef3c7",border:"2px solid #f59e0b",borderRadius:'6px'}}></span> is for Array values</div>
      <div style={{display:'flex',flexDirection:'row',gap:'20px',width:'100%'}}><span style={{width:'80px',height:'20px',background:"#f1f5f9",border:"1px solid #94a3b8",borderRadius:'6px'}}></span> is for Primitive types</div>
      <div>To access array use index with [ ] ex:user.skills[0]</div>

      </div>
    </div>
  );
}
