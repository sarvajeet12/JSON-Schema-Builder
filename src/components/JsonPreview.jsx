import React from "react";

const JsonPreview = ({ data }) => {
  return (
    <div className="w-full sm:w-1/2 bg-gray-100 p-4 rounded">
      <h2 className="font-semibold mb-2">JSON Preview</h2>
      <pre className="text-sm whitespace-pre-wrap">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};

export default JsonPreview;
