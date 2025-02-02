<p>Now I can render any React component on any DOM node I want using ReactDOM.render</p>

import React, { useState, useEffect } from 'react';

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState('');
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(true);

  const convertMarkdownToHtml = (markdownText) => {
    if (!markdownText) return '';

    let html = markdownText;

    html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
    html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');

    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    html = html.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2">$1</a>');
    
    html = html.replace(/^\s*-\s(.+)/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    
    html = html.replace(/^\d+\.\s(.+)/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ol>$1</ol>');
    
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    html = html.replace(/^(?!<[hou]).+$/gm, '<p>$&</p>');

    html = html.replace(/\n/g, '<br>');

    return html;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const htmlContent = convertMarkdownToHtml(markdown);
    setPreview(htmlContent);
  }, [markdown]);

  const handleMarkdownChange = (e) => {
    setMarkdown(e.target.value);
  };

  if (loading) {
    return (
      <div className="app">
        <p className="loading">Loading...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="flex w-full h-screen">
        <div className="w-1/2 p-4">
          <textarea
            className="textarea w-full h-full p-4 border rounded resize-none"
            value={markdown}
            onChange={handleMarkdownChange}
            placeholder="Write your markdown here...

  );
};

export default MarkdownEditor;
