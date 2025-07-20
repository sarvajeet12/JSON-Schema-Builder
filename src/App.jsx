import React from "react";
import JsonBuilder from "./components/JsonBuilder";

const App = () => {
  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-bold mb-4">JSON Schema Builder</h1>
      <JsonBuilder />
    </div>
  );
};

export default App;
