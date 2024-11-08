import React from "react";
import clsx from "clsx";
import colors from "tailwindcss/colors";
import { Icon, MaterialIconType } from "../../foundation";

export interface TagProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  compact?: boolean;
  icon?: MaterialIconType;
  color?: keyof typeof colors;
  className?: string;
  style?: object[];
}

const Tag: React.FC<TagProps> = ({ label, selected, onClick, compact, color, icon, className }) => {
  return (
    <div
      onClick={onClick && onClick}
      className={clsx(
        className,
        selected && !color ? "border-neutral-400 bg-neutral-200" : "border-neutral-500",
        "flex flex-row items-center flex-shrink-0",
        "self-start",
        compact ? "px-1 py-[1px] rounded-md" : "py-[2px] px-[6px] rounded-lg"
      )}
      style={
        color
          ? {
              backgroundColor: colors[selected ? color : "neutral"][selected ? 200 : 200],
              borderColor: colors[selected ? color : "neutral"][selected ? 400 : 600],
            }
          : {}
      }
    >
      {icon && (
        <Icon
          name={icon}
          className={clsx(
            "mr-1",
            selected ? "text-neutral-700" : "text-neutral-400",
            compact ? "text-xs" : "text-sm"
          )}
          size={compact ? 0.6 : 0.8}
          style={{
            ...(color && {
              color: colors[selected ? color : "neutral"][selected ? 600 : 500],
            }),
          }}
        />
      )}
      <span
        className={clsx(
          selected ? "text-neutral-700" : "text-neutral-400",
          compact ? "text-xs" : "text-md",
          "line-clamp-1"
        )}
        style={{
          ...(color && {
            color: colors[selected ? color : "neutral"][selected ? 600 : 500],
          }),
        }}
      >
        {label}
      </span>
    </div>
  );
};

export default Tag;
