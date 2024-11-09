"use client";
import React from "react";
import clsx from "clsx";
import colors from "tailwindcss/colors";
import { Control, useController } from "react-hook-form";

import Tag from "../Tag/Tag";
import { MaterialIconType } from "../../foundation";

type Option = {
  label: string;
  value: string;
  icon?: MaterialIconType;
  color?: keyof typeof colors;
};

export interface TagCloudProps {
  options: Option[];
  allSelected?: boolean;
  selection?: string[];
  onSelect?: (value: string) => void;
  label?: string;
  compact?: boolean;
  noWrap?: boolean;
  max?: number;
  name?: string;
  control?: Control<any, any>;
  className?: string;
}

const TagCloud: React.FC<TagCloudProps> = ({
  options,
  allSelected,
  selection,
  onSelect,
  label,
  compact,
  noWrap,
  max,
  name = "",
  control,
  ...props
}) => {
  const { field, fieldState } = control
    ? useController({ control, defaultValue: [], name })
    : { field: null, fieldState: {} };

  const values = selection || (control ? field?.value : []);
  const { error: fieldError } = fieldState;
  const error = fieldError?.message;

  const onClickHandler = (value: string) => {
    if (onSelect) {
      onSelect(value);
    } else if (field) {
      field.onChange(
        field.value.includes(value)
          ? field.value.filter((v: string) => v !== value)
          : [...(max ? field.value.reverse().slice(0, max - 1) : field.value), value]
      );
    }
  };

  return (
    <div {...props}>
      {(!!error || label) && (
        <span className={clsx("text-xs text-gray-500 mb-2 font-medium", error && "text-red-500")}>
          {error || label}
        </span>
      )}
      <div className={clsx("flex flex-1 flex-row flex-wrap w-full", noWrap && "flex-nowrap")}>
        {options.map((item: Option, index: number) => (
          <Tag
            key={index}
            label={item.label}
            onClick={() => onClickHandler(item.value)}
            selected={allSelected || (values && values.includes(item.value))}
            compact={compact}
            icon={item.icon}
            color={item.color}
            className={clsx(compact ? "m-[2px]" : "m-1")}
          />
        ))}
      </div>
    </div>
  );
};

export default TagCloud;
