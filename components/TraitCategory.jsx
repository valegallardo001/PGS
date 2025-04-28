"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import Trait from "./Trait";
import CustomToggleButton from "@/components/ui/CustomToggleButton";
import * as HoverCard from "@radix-ui/react-hover-card";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const categories = [
  { id: 1, name: "Biology process", traits: [1, 2], pgss: 34 },
  { id: 2, name: "Body measurement", traits: [3], pgss: 5 },
  { id: 3, name: "Cancer", traits: [4, 5], pgss: 101 },
];

const traitsData = {
  1: { id: 1, name: "Brain cancer", childTraits: [10], pgss: 34 },
  2: { id: 2, name: "Cardiovascular measurement", childTraits: [11], pgss: 34 },
  3: { id: 3, name: "Body measurement", childTraits: [12], pgss: 34 },
  4: { id: 4, name: "Cancer", childTraits: [13], pgss: 34 },
  5: { id: 5, name: "Digestive system disorder", childTraits: [14], pgss: 34 },
};

const childTraitsData = {
  10: { id: 10, name: "Glioblastoma" },
  11: { id: 11, name: "Hypertension" },
  12: { id: 12, name: "BMI" },
  13: { id: 13, name: "Breast cancer" },
  14: { id: 14, name: "Irritable bowel syndrome" },
};


const colors = ["#8e44ad", "#2980b9", "#2ecc71", "#e74c3c", "#f1c40f", "#d35400"];

export default function TraitCategory() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isItemSelected = (id, type) =>
    selectedItems.some((item) => item.id === id && item.type === type);

  const handleCategoryToggle = (categoryId) => {
    const category = categories.find((c) => c.id === categoryId);

    if (isItemSelected(categoryId, "category")) {
      setSelectedItems((prev) =>
        prev.filter((item) => !(item.id === categoryId && item.type === "category"))
      );
      if (selectedCategory === categoryId) {
        setSelectedCategory(null);
      }
    } else {
      setSelectedItems((prev) => [
        ...prev,
        { id: category.id, name: category.name, type: "category" },
      ]);
      setSelectedCategory(categoryId);
    }
  };

  const handleTraitToggle = (trait) => {
    if (isItemSelected(trait.id, "trait")) {
      setSelectedItems((prev) =>
        prev.filter((item) => !(item.id === trait.id && item.type === "trait"))
      );
    } else {
      setSelectedItems((prev) => [
        ...prev,
        { id: trait.id, name: trait.name, type: "trait" },
      ]);
    }
  };

  const handleChildTraitToggle = (childId, childName) => {
    if (isItemSelected(childId, "childTrait")) {
      setSelectedItems((prev) =>
        prev.filter((item) => !(item.id === childId && item.type === "childTrait"))
      );
    } else {
      setSelectedItems((prev) => [
        ...prev,
        { id: childId, name: childName, type: "childTrait" },
      ]);
    }
  };

  // Generar data del gráfico dinámicamente desde las categorías
  const chartData = categories.map((cat, index) => ({
    name: cat.name,
    value: cat.pgss,
    color: colors[index % colors.length],
  }));

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex space-x-4">
        {/* COLUMNA 1: Categorías */}
        <Card>
          <h2 className="text-lg font-bold mb-2">Trait Category</h2>
          {categories.map((category) => (
            <HoverCard.Root key={category.id} openDelay={150} closeDelay={150}>
              <HoverCard.Trigger asChild>
                <div>
                  <CustomToggleButton
                    label={category.name}
                    tag={category.pgss}
                    isActive={isItemSelected(category.id, "category")}
                    onToggle={() => handleCategoryToggle(category.id)}
                  />
                </div>
              </HoverCard.Trigger>

              <HoverCard.Content
                side="right"
                className="rounded-xl bg-white shadow-lg p-4 w-64 border border-gray-200 z-50"
              >
                <div className="font-bold text-base mb-1">{category.name}</div>
                <div className="text-sm text-gray-600 mb-1">
                  ID:{" "}
                  <a
                    href="https://www.ebi.ac.uk/ols4/ontologies/efo/terms?iri=http://purl.obolibrary.org/obo/MONDO_0001657"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    MONDO_0001657
                  </a>
                </div>
                <div className="text-sm text-gray-600">
                  Description: A primary or metastatic malignant neoplasm affecting the brain. [NCIT: C3568]
                </div>
              </HoverCard.Content>
            </HoverCard.Root>
          ))}
        </Card>



        {/* COLUMNA 2: Rasgos */}
        {selectedCategory && (
          <Trait
            traits={categories
              .find((c) => c.id === selectedCategory)
              ?.traits.map((id) => traitsData[id])}
            selectedItems={selectedItems}
            onTraitClick={handleTraitToggle}
            onChildTraitClick={(childId) =>
              handleChildTraitToggle(childId, childTraitsData[childId]?.name)
            }

          />
        )}
      </div>

      {/* COLUMNA 3: Gráfico */}
      {isClient && (
        <div className="flex justify-center">
          <PieChart width={400} height={400}>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              fill="#8884d8"
              paddingAngle={3}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      )}

      {/* CUADRO FINAL: Selección */}
      <Card>
        <h2 className="text-lg font-bold mb-2">Seleccionados</h2>
        {selectedItems.filter((item) => item.type !== "category").length === 0 ? (
          <p className="text-sm text-gray-500">Ninguno seleccionado aún.</p>
        ) : (
          <ul className="list-disc list-inside text-sm text-gray-800">
            {selectedItems
              .filter((item) => item.type === "trait" || item.type === "childTrait")
              .map((item) => (
                <li key={`${item.type}-${item.id}`}>
                  {item.type === "trait" ? "🧬" : "🌱"} {item.name}
                </li>
              ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
