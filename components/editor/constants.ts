import { IBlockType } from "./types";
import { BlockTypeEnum } from "@/storage/types";

export const blocks = [
  { type: BlockTypeEnum.HEADER, label: "Heading" },
  { type: BlockTypeEnum.QUESTION, label: "Question" },
  { type: BlockTypeEnum.BUTTON, label: "Button" },
  { type: BlockTypeEnum.FOOTER, label: "Footer" },
];