"use client";

import { useEffect, useState } from "react";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch("/api/usuarios")
      .then((res) => res.json())
      .then((data) => setUsuarios(data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">PHENOTYPE SELECTOR</h1>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id} className="p-2 border-b">
            {usuario.nombre} - {usuario.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
