"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import ChildTrait from "./ChildTrait";

export default function Trait({ traits }) {
  const [selectedTrait, setSelectedTrait] = useState(null);

  return (
    <div className="flex space-x-4">
      {/* COLUMNA 2: Rasgos */}
      <Card className="w-1/2 p-4">
        <h2 className="text-lg font-bold mb-2">Trait</h2>
        {traits.map((trait) => (
          <Button
            key={trait.id}
            variant={selectedTrait === trait.id ? "default" : "outline"}
            className="w-full h-16 mb-2"
            onClick={() => setSelectedTrait(trait.id)}
          >
            {trait.name}
          </Button>
        ))}
      </Card>

      {/* COLUMNA 3: *Child Traits* (se muestran cuando se selecciona un rasgo) */}
      {selectedTrait && (
        <ChildTrait
          childTraits={traits.find((t) => t.id === selectedTrait).childTraits}
        />
      )}
    </div>
  );
}
