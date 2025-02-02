import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import "./styles.css";

const MarkdownApp = () => {
  const [markdown, setMarkdown] = useState(`
# Welcome to Markdown Editor

Start typing...

- Bullet list
- Another item

**Bold Text**  
_Italic Text_  
\`Inline code\`  

[Link](https://reactjs.org/)
`);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <div className="app">
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <>
          <textarea
            className="textarea"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
          />
          <div className="preview">
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </div>
        </>
      )}
    </div>
  );
};

export default MarkdownApp;
