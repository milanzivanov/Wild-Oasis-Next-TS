"use client";

import { useState } from "react";

function TextExpander({ children }: { children: React.ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const displayText = isExpanded
    ? children
    : typeof children === "string"
    ? children.split(" ").slice(0, 40).join(" ") + "..."
    : children;

  return (
    <span>
      {displayText}{" "}
      <button
        className="text-primary-700 border-b border-primary-700 leading-3 pb-1"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "Show less" : "Show more"}
      </button>
    </span>
  );
}

export default TextExpander;
