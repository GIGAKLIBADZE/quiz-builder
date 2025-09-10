"use client";

import { FC } from "react";

interface IHeaderProps {
  id: string;
  text: string;
}

export const Header: FC<IHeaderProps> = ({ id, text }) => {
  return (
    <h2 key={id} className="text-xl font-semibold">
      {text}
    </h2>
  );
};
