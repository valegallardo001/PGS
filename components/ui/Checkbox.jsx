"use client";

export function Checkbox({ checked, onChange, label }) {
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
      />
      <span>{label}</span>
    </label>
  );
}
