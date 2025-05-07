"use client";

import { useState, useEffect, useMemo } from "react";
import { Card } from "@/components/ui/Card";
import Trait from "./Trait";
import CustomToggleButton from "@/components/ui/CustomToggleButton";
import * as HoverCard from "@radix-ui/react-hover-card";
import TraitChart from "./TraitChart";
import LargeCard from "@/components/ui/LargeCard";

const categories = [
  { id: 1, name: "Biology process", traits: [1, 2], pgss: 34 },
  { id: 2, name: "Body measurement", traits: [3], pgss: 5 },
  { id: 3, name: "Cancer", traits: [4, 5], pgss: 101 },
];

const traitsData = {
  1: {
    id: 1,
    name: "Brain cancer",
    pgss: 34,
    description:
      "A primary or metastatic malignant neoplasm affecting the brain.",
    URL: "https://www.ebi.ac.uk/ols4/ontologies/efo/terms?iri=http://purl.obolibrary.org/obo/MONDO_0001657",
    onto_id: "MONDO_0001657",
  },
  2: {
    id: 2,
    name: "Cardiovascular measurement",
    pgss: 34,
    description:
      "A primary or metastatic malignant neoplasm affecting the brain. [NCIT: C3568]",
    URL: "https://www.ebi.ac.uk/ols4/ontologies/efo/terms?iri=http://purl.obolibrary.org/obo/MONDO_0001657",
    onto_id: "MONDO_0001657",
  },
  3: {
    id: 3,
    name: "Body measurement",
    pgss: 34,
    description:
      "A primary or metastatic malignant neoplasm affecting the brain. [NCIT: C3568]",
    URL: "https://www.ebi.ac.uk/ols4/ontologies/efo/terms?iri=http://purl.obolibrary.org/obo/MONDO_0001657",
    onto_id: "MONDO_0001657",
  },
  4: {
    id: 4,
    name: "Cancer",
    pgss: 34,
    description:
      "A primary or metastatic malignant neoplasm affecting the brain. [NCIT: C3568]",
    URL: "https://www.ebi.ac.uk/ols4/ontologies/efo/terms?iri=http://purl.obolibrary.org/obo/MONDO_0001657",
    onto_id: "MONDO_0001657",
  },
  5: {
    id: 5,
    name: "Digestive system disorder",
    pgss: 34,
    description:
      "A primary or metastatic malignant neoplasm affecting the brain. [NCIT: C3568]",
    URL: "https://www.ebi.ac.uk/ols4/ontologies/efo/terms?iri=http://purl.obolibrary.org/obo/MONDO_0001657",
    onto_id: "MONDO_0001657",
  },
};

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

  const colors = ["#8e44ad", "#2980b9", "#2ecc71", "#e74c3c", "#f1c40f", "#d35400"];
  const chartData = useMemo(() => {
    return categories.map((cat, index) => ({
      name: cat.name,
      value: cat.pgss,
      color: colors[index % colors.length],
    }));
  }, []);

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex space-x-4">
        {/* COLUMNA 3: Gráfico */}
        {isClient && (
          <div className="flex justify-center">
            <TraitChart data={chartData} />
          </div>
        )}

        {/* COLUMNA 1: Categorías */}
        <Card>
          <h2 className="text-lg font-bold mb-2">Trait Category</h2>
          {categories.map((category) => (
            <div key={category.id}>
              <CustomToggleButton
                label={category.name}
                tag={category.pgss}
                isActive={isItemSelected(category.id, "category")}
                onToggle={() => handleCategoryToggle(category.id)}
              />
            </div>
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
          />
        )}
      </div>


      {/* CUADRO FINAL: Selección */}
      <LargeCard title="Seleccionados">
        {selectedItems.filter((item) => item.type === "trait").length === 0 ? (
          <p className="text-sm text-gray-500">Ninguno seleccionado aún.</p>
        ) : (
          <>
            {/* Lista con scroll */}
            <ul className="max-h-64 overflow-y-auto pr-2 space-y-2">
              {selectedItems
                .filter((item) => item.type === "trait")
                .map((item) => (
                  <li
                    key={`trait-${item.id}`}
                    className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded-md shadow-sm"
                  >
                    <span>🧬 {item.name}</span>
                    <button
                      onClick={() =>
                        setSelectedItems((prev) =>
                          prev.filter((i) => !(i.id === item.id && i.type === "trait"))
                        )
                      }
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
            </ul>

            {/* Línea divisoria */}
            <hr className="my-4 border-gray-300" />

            {/* Total de modelos */}
            <div className="text-right text-base font-semibold text-gray-700">
              Total modelos:{" "}
              {selectedItems
                .filter((item) => item.type === "trait")
                .reduce((acc, item) => acc + (traitsData[item.id]?.pgss || 0), 0)}
            </div>
          </>
        )}
      </LargeCard>
    </div>
  );
}
