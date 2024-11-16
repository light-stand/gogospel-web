"use client";
import React from "react";
import clsx from "clsx";
import { Control, useController } from "react-hook-form";

import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../../popover";
import { Calendar } from "../../calendar";
import { Button } from "../../button";
import dayjs from "@/utils/date";
import { Input } from "../../input";
import { useTranslations } from "next-intl";

export interface DatePickerProps {
  name: string;
  control: Control<any, any>;
  className?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ name, control, ...props }) => {
  const { field, fieldState } = useController({ control, name });
  const t = useTranslations("mission.creation.placeholder");
  const date = field?.value;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Input
          value={date ? dayjs(date).format("LL") : t("startDate")}
          className={clsx("text-left", !date && "text-neutral-500")}
        />
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={field?.onChange} initialFocus />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
