import { useState, useRef } from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = ({ language, code, setCode, onEditorReady }) => {
  const [isTyping, setIsTyping] = useState(false);
  const typingTimerRef = useRef(null);

  const handleEditorChange = (value) => {
    setCode(value || "");

    // Trigger typing glow
    setIsTyping(true);

    // Clear existing timer and set a new one to turn off glow after typing stops
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
    }

    typingTimerRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 500);
  };

const handleEditorMount = (editor, monaco) => {
  if (onEditorReady) {
    onEditorReady();
  }
};

  return (
    <div
      className={`h-full w-full overflow-hidden rounded-xl border transition-all duration-300 ${
        isTyping
          ? "border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.35)]"
          : "border-blue-600 focus-within:border-blue-500 focus-within:shadow-[0_0_15px_rgba(37,99,235,0.2)]"
      }`}
    >
      <Editor
        height="100%"
        language={language}
        value={code}
        onChange={handleEditorChange}
        theme="vs-dark"
        onMount={handleEditorMount}
        options={{
          fontSize: 14,
          minimap: {
            enabled: false,
          },
          automaticLayout: true,
          scrollBeyondLastLine: false,
          wordWrap: "on",
          padding: {
            top: 15,
          },
          tabSize: 4,
          smoothScrolling: true,
          cursorBlinking: "smooth",
        }}
      />
    </div>
  );
};

export default CodeEditor;