"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import ChildTrait from "./ChildTrait";
import CustomToggleButton from "@/components/ui/CustomToggleButton";
import * as HoverCard from "@radix-ui/react-hover-card";

export default function Trait({ traits, onTraitClick, onChildTraitClick, selectedItems }) {
  const [selectedTrait, setSelectedTrait] = useState(null);

  const handleTraitSelect = (trait) => {
    setSelectedTrait(trait.id);
    if (onTraitClick) {
      onTraitClick({
        id: trait.id,
        name: trait.name,
        type: "trait",
      });
    }
  };

  const isTraitSelected = (id) =>
    selectedItems?.some((item) => item.id === id && item.type === "trait");

  const selectedChildTraits = selectedItems
    ?.filter((item) => item.type === "childTrait")
    .map((item) => item.id);

  return (
    <div className="flex space-x-4">
      {/* COLUMNA 2: Rasgos */}
      <Card>
        <h2 className="text-lg font-bold mb-2">Trait</h2>

        {traits.map((trait) => {
          const isSelected = isTraitSelected(trait.id);

          return (
            <HoverCard.Root key={trait.id} openDelay={150} closeDelay={150}>
              <HoverCard.Trigger asChild>
                <div
                  className={`cursor-pointer ${isSelected ? "bg-blue-100 rounded-md" : ""}`}
                  onClick={() => handleTraitSelect(trait)}
                >
                  <CustomToggleButton
                    label={trait.name}
                    tag={trait.pgss}
                    isActive={isSelected}
                    onToggle={(e) => {
                      e.stopPropagation(); // 🚫 Evita que suba al div
                      handleTraitSelect(trait);
                    }}

                  />
                </div>
              </HoverCard.Trigger>

              <HoverCard.Content
                side="right"
                className="rounded-xl bg-white shadow-lg p-4 w-64 border border-gray-200 z-50"
              >
                <div className="font-bold text-base mb-1">{trait.name}</div>
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
          );
        })}
      </Card>

      {/* COLUMNA 3: Child Traits */}
      {selectedTrait && (
        <ChildTrait
          childTraits={traits.find((t) => t.id === selectedTrait)?.childTraits || []}
          selectedChildTraits={selectedChildTraits}
          onChildTraitSelect={onChildTraitClick}
        />
      )}
    </div>
  );
}
