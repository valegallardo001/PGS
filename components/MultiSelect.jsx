"use client";

import { Select, SelectItem } from "@heroui/react";
import { useState, useEffect } from "react";
import { RefreshCcw } from "lucide-react";
import clsx from "clsx";

export default function BroadAncestrySelector() {
  const [options, setOptions] = useState([]);
  const [selectedAncestries, setSelectedAncestries] = useState(new Set());

  useEffect(() => {
    fetch("/api/BroadAncestry")
      .then((res) => res.json())
      .then((data) =>
        setOptions(
          data.sort((a, b) =>
            a.label.localeCompare(b.label)
          )
        )
      )
      .catch((error) => console.error("Error al cargar los datos:", error));
  }, []);

  const handleSelectionChange = (keys) => {
    if (keys.size <= 4) {
      setSelectedAncestries(new Set(keys));
    }
  };

  const resetSelection = () => {
    setSelectedAncestries(new Set());
  };

  return (
    <div className="w-[400px] p-5"> {/* Puedes ajustar a tu tamaño ideal */}
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <label className="block text-lg font-bold text-black mb-1">
            Ancestry <span className="text-gray-500 text-sm">ℹ️</span>
          </label>

          {/* Contenedor fijo para evitar que crezca */}
          <div className="w-full max-w-full">
            <Select
              className="w-full truncate bg-gray-800 text-white border border-gray-600 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500"
              placeholder="ALL"
              selectionMode="multiple"
              selectedKeys={selectedAncestries}
              onSelectionChange={handleSelectionChange}
              listboxProps={{
                className:
                  "bg-gray-800 border border-gray-600 rounded-lg shadow-md text-white max-h-40 overflow-auto",
              }}
            >
              {options.map((item) => (
                <SelectItem
                  key={item.symbol}
                  textValue={item.label}
                  className={({ isSelected }) =>
                    clsx(
                      "px-4 py-2 rounded-md transition",
                      isSelected
                        ? "bg-blue-600 text-white font-bold"
                        : "bg-gray-700 text-gray-200"
                    )
                  }
                >
                  {item.label}
                </SelectItem>
              ))}
            </Select>
          </div>

          {/* Etiqueta con abreviaciones */}
          <div className="mt-2 text-sm font-semibold text-black truncate">
            <span className="mr-1">SELECTED:</span>
            {selectedAncestries.size > 0
              ? Array.from(selectedAncestries).join(", ")
              : "Ninguna seleccionada"}
          </div>
        </div>

        <div className="flex flex-col items-center pt-7">
          <button
            onClick={resetSelection}
            className="bg-orange-400 hover:bg-orange-500 text-white p-3 rounded-full shadow-md transition"
            title="Reset selection"
          >
            <RefreshCcw size={20} />
          </button>
          <span className="text-sm text-black mt-1 font-semibold">Reset</span>
        </div>
      </div>
    </div>

  );
}
