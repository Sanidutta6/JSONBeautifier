import React, { useRef, useEffect } from "react";

function TextArea({ jsonInput, handleInputChange, readOnly=false, formatted=false }) {
  const textareaRef = useRef(null);

  useEffect(() => {
    adjustTextareaHeight();
  }, [jsonInput]);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <textarea
      readOnly={readOnly}
      className={`w-full border-none resize-none bg-background-2 text-sm outline-none ${formatted?"whitespace-pre":"whitespace-nowrap"} scrollbar-none`}
      ref={textareaRef}
      value={jsonInput}
      onChange={handleInputChange}
    />
  );
}

export default TextArea;
