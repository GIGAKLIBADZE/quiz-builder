"use client";

import { FC } from "react";

interface IFooterProps {
  id: string;
  text: string;
}

export const Footer: FC<IFooterProps> = ({ id, text }) => (
  <footer key={id} className="text-sm text-gray-500">
    {text}
  </footer>
);
