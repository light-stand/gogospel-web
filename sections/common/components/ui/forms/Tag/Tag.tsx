import React from "react";
import clsx from "clsx";
import colors from "tailwindcss/colors";

export interface TagProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  compact?: boolean;
  // icon?: MaterialIconType;
  icon?: string;
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
        "flex flex-row rounded-lg items-center",
        "self-start",
        compact ? "px-1 py-[1px]" : "py-1 px-2"
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
        <></>
        // <Icon
        //   name={icon}
        //   className={clsx(
        //     "mr-1",
        //     selected ? "text-neutral-700" : "text-neutral-400",
        //     compact ? "text-xs" : "text-sm"
        //   )}
        //   style={[
        //     {
        //       ...(color && {
        //         color: colors[selected ? color : "neutral"][selected ? 600 : 500],
        //       }),
        //     },
        //   ]}
        // />
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
