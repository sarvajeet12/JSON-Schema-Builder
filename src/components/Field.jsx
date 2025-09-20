import React from "reac";

const Field = ({ data, onChange, onDelete }) => {
  const handleKeyChange = (e) => onChange({ ...data, key: e.target.value });

  // type change handler
  const handleTypeChange = (e) => {
    // Taking value
    const newType = e.target.value;
    if (newType === "nested") {
      onChange({ ...data, type: newType, children: [] });
    } else {
      onChange({ ...data, type: newType, children: undefined });
    }
  };

  // required change handler
  const handleRequiredChange = () => {
    onChange({ ...data, required: !data.required });
  };

  // nested chnge handler
  const handleNestedChange = (index, updatedChild) => {
    const updatedChildren = [...(data.children || [])];
    updatedChildren[index] = updatedChild;
    onChange({ ...data, children: updatedChildren });
  };

  // add nested handler
  const addNestedField = () => {
    onChange({
      ...data,
      children: [
        ...(data.children || []),
        { key: "", type: "string", required: false },
      ],
    });
  };

  // delete nested handler
  const deleteNestedField = (index) => {
    const updatedChildren = data.children.filter((_, i) => i !== index);
    onChange({ ...data, children: updatedChildren });
  };

  return (
    <div className="border-l-4 pl-4 mb-4">
      <div className="flex items-center gap-2 mb-2">
        <input
          value={data.key}
          onChange={handleKeyChange}
          placeholder="Key"
          className="border px-2 py-1 w-40"
        />
        <select
          value={data.type}
          onChange={handleTypeChange}
          className="border px-2 py-1"
        >
          <option value="string">string</option>
          <option value="number">number</option>
          <option value="float">float</option>
          <option value="boolean">boolean</option>
          <option value="objectId">objectId</option>
          <option value="array">array</option>
          <option value="nested">nested</option>
        </select>
        <label className="flex items-center gap-1">
          <div className="relative">
            <input
              type="checkbox"
              checked={data.required || false}
              onChange={handleRequiredChange}
              className="sr-only"
              id="requiredToggle"
            />
            <div className="block bg-gray-300 w-10 h-6 rounded-full"></div>
            <div
              className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
                data.required ? "translate-x-4" : ""
              }`}
            ></div>
          </div>
        </label>
        <button onClick={onDelete} className="text-black font-bold text-xl">
          ×
        </button>
      </div>

      {data.type === "nested" && (
        <div className="ml-6">
          {data.children?.map((child, index) => (
            <Field
              key={index}
              data={child}
              onChange={(updated) => handleNestedChange(index, updated)}
              onDelete={() => deleteNestedField(index)}
            />
          ))}
          <button
            onClick={addNestedField}
            className="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
          >
            + Add Item
          </button>
        </div>
      )}
    </div>
  );
};

export default Field;
