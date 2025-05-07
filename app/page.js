import Image from "next/image";
import MultiSelect from "@/components/MultiSelect"; // Importa el selector
import TraitSelector from "@/components/TraitCategory";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] grid-cols-12 min-h-screen p-8 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Header (fila 1) */}
      <header className="col-span-12 text-center sm:text-left">
        <h1 className="text-4xl font-bold text-black">PHENOTYPE SELECTOR</h1>
      </header>

      {/* Main content (fila 2) */}
      <main className="col-span-12 sm:col-span-10 flex flex-col gap-8 sm:gap-12 items-center sm:items-start">
        
        {/* Componente MultiSelect en la segunda columna */}
        <div className="col-span-12 sm:col-span-6">
          <MultiSelect />
        </div>
        
        {/* Componente TraitSelector en la segunda columna */}
        <div className="col-span-12 sm:col-span-6">
          <TraitSelector />
        </div>
      </main>
    </div>
  );
}
