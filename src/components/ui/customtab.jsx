import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { Badge } from "./badge";

export const CustomTab = ({
  text,
  selected,
  setSelected,
  discount = false,
}) => {
  return (
    <button
      onClick={() => setSelected(text)}
      className={cn(
        "relative w-fit px-4 py-2 text-sm font-semibold capitalize text-foreground transition-colors",
        discount && "flex items-center justify-center gap-2.5",
      )}
    >
      <span className="relative z-10">{text}</span>
      {selected && (
        <motion.span
          layoutId="tab"
          transition={{ type: "spring", duration: 0.4 }}
          className="absolute inset-0 z-0 rounded-full bg-background shadow-sm"
        ></motion.span>
      )}
      {discount && (
        <Badge
          className={cn(
            "relative z-10 whitespace-nowrap bg-gray-100 text-xs text-black shadow-none",
            selected
              ? "bg-red-600 text-white"
              : "bg-red-600 text-white",
          )}
        >
          Save 35%
        </Badge>
      )}
    </button>
  );
};