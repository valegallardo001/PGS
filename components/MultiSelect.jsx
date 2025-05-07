"use client";

import { Select, SelectItem } from "@heroui/react";
import { useState, useEffect } from "react";
import { RefreshCcw } from "lucide-react";
import { Info } from "lucide-react";

import clsx from "clsx";

export default function BroadAncestrySelector() {
  const [options, setOptions] = useState([]);
  const [selectedAncestries, setSelectedAncestries] = useState(new Set());

  useEffect(() => {
    fetch("/api/BroadAncestry")
      .then((res) => res.json())
      .then((data) => {
        console.log("Data loaded:", data); // Verifica si los datos se cargan correctamente
        setOptions(data.sort((a, b) => a.label.localeCompare(b.label)));
      })
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
    <div className="w-[400px] p-5">
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <label className="block text-lg font-bold text-black mb-1">
            Ancestry
            <span className="relative group ml-2 align-middle inline-block">
              <Info size={20} className="text-gray-500 cursor-pointer" />
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-64 px-3 py-2 bg-black text-white text-sm rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 pointer-events-none">
                Puedes seleccionar hasta 4 grupos ancestrales.
              </div>
            </span>
          </label>
          <div className="w-full max-w-full">
            <Select
              aria-label="Select ancestry groups" // Se agrega un aria-label para accesibilidad
              className="w-full truncate bg-gray-800 text-white border border-gray-600 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500"
              placeholder="Ninguna"
              selectionMode="multiple"
              selectedKeys={[...selectedAncestries]}
              onSelectionChange={handleSelectionChange}
              listboxProps={{
                className:
                  "bg-gray-800 border border-gray-600 rounded-lg shadow-md text-white max-h-40 overflow-auto",
              }}
            >
              {options.map((item) => {
                console.log("Item en el map:", item); // Verifica cada item que se itera
                return (
                  <SelectItem
                    key={item.symbol}
                    textValue={item.label}
                    aria-label={item.label}
                    className={({ isSelected }) => {
                      
                      const isCurrentlySelected = isSelected || selectedAncestries.has(item.symbol);
                      console.log(`Item: ${item.label}`);
                      console.log(`isSelected: ${isSelected}, isSelected in Set: ${selectedAncestries.has(item.symbol)}`);
                      console.log(`isCurrentlySelected: ${isCurrentlySelected}`);

                      return clsx(
                        "px-4 py-2 rounded-md transition",
                        isCurrentlySelected
                          ? "bg-red-600 text-white font-semibold"
                          : "bg-white text-gray-800 hover:bg-gray-100"
                      );
                    }}
                  >
                    {item.label}
                  </SelectItem>
                );
              })}


            </Select>
          </div>

          <div className="mt-2 text-sm font-semibold text-black truncate">
            <span className="mr-1">SELECTED:</span>
            {selectedAncestries.size > 0
              ? Array.from(selectedAncestries).join(", ")
              : "NONE"}
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
