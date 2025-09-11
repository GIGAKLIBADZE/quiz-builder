"use client";

import { FC } from "react";

interface ITextInputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export const TextInputField: FC<ITextInputFieldProps> = ({
  label,
  value,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded px-2 py-1 
                   focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
};
