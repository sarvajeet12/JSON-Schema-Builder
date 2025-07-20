import React, { useState } from "react";
import Field from "./Field";
import JsonPreview from "../components/JsonPreview";

const JsonBuilder = () => {
  // States
  const [fields, setFields] = useState([]);

  // handle functions
  const handleChange = (index, field) => {
    const updatedFields = [...fields];
    updatedFields[index] = field;
    setFields(updatedFields);
  };

  // adding fields handler
  const addField = () => {
    setFields([...fields, { key: "", type: "string", required: false }]);
  };

  // delete handler
  const deleteField = (index) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields);
  };

  const buildJson = (fields) => {
    // set initially json is emapty
    const json = {};

    for (const field of fields) {
      if (!field.key) continue;
      if (field.type === "nested") {
        json[field.key] = buildJson(field.children || []);
      } else if (field.type === "array") {
        json[field.key] = [];
      } else if (field.type === "boolean") {
        json[field.key] = "boolean";
      } else if (field.type === "float") {
        json[field.key] = "float";
      } else if (field.type === "objectId") {
        json[field.key] = "ObjectId";
      } else {
        json[field.key] = field.type === "string" ? "STRING" : "number";
      }
    }
    return json;
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-8">
        <div className="w-1/2">
          {fields.map((field, index) => (
            <Field
              key={index}
              index={index}
              data={field}
              onChange={(updated) => handleChange(index, updated)}
              onDelete={() => deleteField(index)}
            />
          ))}
          <button
            onClick={addField}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Add Item
          </button>
        </div>

        <JsonPreview data={buildJson(fields)} />
      </div>
      <div className="mt-8">
        <button className="border-1 border-slate-400 px-4 py-2 rounded-xs cursor-pointer">
          Submit
        </button>
      </div>
    </div>
  );
};

export default JsonBuilder;
