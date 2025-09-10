"use client";

import { FC } from "react";

interface IButtonProps {
  id: string;
  text: string;
}

export const Button: FC<IButtonProps> = ({ id, text }) => (
  <button
    key={id}
    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
    type="button"
  >
    {text}
  </button>
);
