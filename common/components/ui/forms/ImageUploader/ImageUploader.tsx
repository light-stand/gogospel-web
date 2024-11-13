"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";
import { Control, useController } from "react-hook-form";

import { Icon } from "@/components/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { uploadFile } from "@/utils/s3";
import { useApi } from "@/common/context/ApiContext";

type ImageUploderProps = {
  control?: Control<any, any>;
  className?: string;
  name?: string;
};

export const ImageUploder = ({ name = "", control, ...props }: ImageUploderProps) => {
  const t = useTranslations();
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { client } = useApi();

  const { field, fieldState } = control
    ? useController({ control, defaultValue: [], name })
    : { field: null, fieldState: {} };

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | null | undefined = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    const url = await uploadFile(file, client);
    setLoading(false);
    if (!url) return;
    field?.onChange(url);
  };

  return (
    <div
      className="flex flex-col cursor-pointer  hover:opacity-80"
      onClick={() => fileInputRef.current?.click()}
    >
      <Avatar className="w-32 h-32 shadow-md">
        {!loading && <AvatarImage src={field?.value} alt="profile" className="z-10" />}
        {field?.value && (
          <div className="w-full h-full flex justify-center items-center absolute z-20 opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-50">
            <Icon name="pencil" className="text-white" size={1} />
          </div>
        )}
        <AvatarFallback>
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Icon name="camera" className="text-neutral-500" size={2} />
          )}
        </AvatarFallback>
      </Avatar>
      <span className="mt-4 font-bold text-neutral-500">{t("profiling.fields.image.label")}</span>
      <input
        className="hidden"
        ref={fileInputRef}
        type="file"
        onChange={onChange}
        accept="image/png, image/jpeg"
      />
    </div>
  );
};

export default ImageUploder;
