'use client'

import { useState } from 'react'
import clsx from 'clsx'

export default function CustomToggleButton({ label, tag, onToggle }) {
  const [selected, setSelected] = useState(false)

  const handleClick = () => {
    const newState = !selected
    setSelected(newState)
    if (onToggle) onToggle(newState)
  }

  return (
    <button
      onClick={handleClick}
      className={clsx(
        "w-full flex items-center justify-between px-4 py-2 rounded-md border transition-all",
        selected ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
      )}
    >
      <span className="text-left">{label}</span>
      {tag && (
        <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-200 text-gray-700">
          {tag}
        </span>
      )}
    </button>
  )
}
