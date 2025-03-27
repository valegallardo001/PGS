"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const childTraitsData = {
  10: { id: 10, name: "Estrogen-receptor negative" },
  11: { id: 11, name: "Blood pressure" },
  12: { id: 12, name: "Height measurement" },
  13: { id: 13, name: "Lung cancer" },
  14: { id: 14, name: "Colon disorder" },
};

export default function ChildTrait({ childTraits }) {
  return (
    <Card className="w-1/2 p-4">
      <h2 className="text-lg font-bold mb-2">Child Trait</h2>
      {childTraits.map((id) => (
        <Button key={id} variant="outline" className="w-full h-16 mb-2">
          {childTraitsData[id].name}
        </Button>
      ))}
    </Card>
  );
}
