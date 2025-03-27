"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Trait from "./Trait";

const categories = [
  { id: 1, name: "Biology process", traits: [1, 2] },
  { id: 2, name: "Body measurement", traits: [3] },
  { id: 3, name: "Cancer", traits: [4, 5] },
];

const traitsData = {
  1: { id: 1, name: "Brain cancer", childTraits: [10] },
  2: { id: 2, name: "Cardiovascular measurement", childTraits: [11] },
  3: { id: 3, name: "Body measurement", childTraits: [12] },
  4: { id: 4, name: "Cancer", childTraits: [13] },
  5: { id: 5, name: "Digestive system disorder", childTraits: [14] },
};

export default function TraitCategory() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="flex space-x-4">
      {/* COLUMNA 1: Categorías */}
      <Card className="w-full md:w-1/3 lg:w-1/2 p-4">
        <h2 className="text-lg font-bold mb-2">Trait Category</h2>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            className="w-full h-16 mb-2"
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </Card>

      {/* COLUMNA 2: Rasgos (se muestran cuando se selecciona una categoría) */}
      {selectedCategory && (
        <Trait
          traits={categories
            .find((c) => c.id === selectedCategory)
            .traits.map((id) => traitsData[id])}
        />
      )}
    </div>
  );
}
