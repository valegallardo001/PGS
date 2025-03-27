"use client";

import { Select, SelectItem } from "@heroui/react";
import { useState, useEffect } from "react";

export default function BroadAncestrySelector() {
  const [options, setOptions] = useState([]);
  const [selectedAncestries, setSelectedAncestries] = useState(new Set());

  useEffect(() => {
    fetch("/api/BroadAncestry")
      .then((res) => res.json())
      .then((data) => setOptions(data.sort((a, b) => a.Display_category.localeCompare(b.Display_category))))
      .catch((error) => console.error("Error al cargar los datos:", error));
  }, []);

  const handleSelectionChange = (keys) => {
    if (keys.size <= 4) {
      setSelectedAncestries(new Set(keys));
    }
  };

  return (
    <div className="w-80">
      <label className="block text-lg font-bold text-black">Ancestry</label>
      <Select
        className="max-w-xs bg-gray-800 text-white border border-gray-600 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500"
        label="Broad Ancestry"
        placeholder="Selecciona ancestría"
        selectionMode="multiple"
        selectedKeys={selectedAncestries}
        onSelectionChange={handleSelectionChange}
        displayValue={() =>
          Array.from(selectedAncestries)
            .map((key) => options.find((o) => o.Symbol === key)?.Symbol)  
            .join(", ") || "Selecciona ancestría"
        }
        listboxProps={{ className: "bg-gray-800 border border-gray-600 rounded-lg shadow-md" }}
      >
        {options.map((item) => (
          <SelectItem
            key={item.Symbol}
            textValue={item.Display_category}
            className={({ isSelected }) =>
              `px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white ${
                isSelected ? "bg-blue-600 text-white font-bold" : "bg-gray-700 text-gray-200"
              }`
            }
          >
            {item.Display_category}  
          </SelectItem>
        ))}
      </Select>
      <p className="mt-2 text-black">
        Seleccionados: {Array.from(selectedAncestries).map((key) => options.find(o => o.Symbol === key)?.Symbol).join(", ")}
      </p>
    </div>
  );
}
