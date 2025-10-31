import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; 

export default function RichTextEditor({ value, onChange }) {
  return (
    <div style={{ marginTop: "8px" }}>
<ReactQuill
  theme="snow"
  value={value}
  onChange={onChange}
  placeholder="Paste or type recipe instructions here..."
  style={{
    borderRadius: "8px",
    border: "1px solid #ccc",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    minHeight: "200px",
    padding: "8px"
  }}
/>

    </div>
  );
}
