"use client";

import { Card } from "@/components/ui/Card";
import CustomToggleButton from "@/components/ui/CustomToggleButton"; // Asegúrate de importar tu botón personalizado

const childTraitsData = {
  10: { id: 10, name: "Estrogen-receptor negative" },
  11: { id: 11, name: "Blood pressure" },
  12: { id: 12, name: "Height measurement" },
  13: { id: 13, name: "Lung cancer" },
  14: { id: 14, name: "Colon disorder" },
};

export default function ChildTrait({ childTraits, selectedChildTrait, onChildTraitSelect }) {
  return (
    <Card>
      <h2 className="text-lg font-bold mb-2">Child Trait</h2>
      {childTraits.map((id) => (
        <CustomToggleButton
          key={id}
          label={childTraitsData[id].name}
          tag={null} // Si no necesitas un número al lado del texto, deja esto como null
          isSelected={selectedChildTrait === id}
          onToggle={() => onChildTraitSelect(id)}
        />
      ))}
    </Card>
  );
}
