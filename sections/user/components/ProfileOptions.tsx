"use client";
import clsx from "clsx";
import { Fragment } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { Icon } from "@/components/ui";
import { signOut } from "@/app/auth/actions";
import { ProfileOption } from "@/user/domain/profileOptions";

interface ProfileOptionsProps {
  options: ProfileOption;
}

export const ProfileOptions = ({ options }: ProfileOptionsProps) => {
  const router = useRouter();
  const t = useTranslations();

  const actions = {
    logout: async () => {
      await signOut();
      window.location.href = "/"; // Trigger a full page reload
    },
    openVerificationCode: () => router.push("/verification"),
  };

  return (
    <div className="justify-between gap-y-2">
      {options.map((option, index) => (
        <Fragment key={index}>
          {option.label && <span className="font-bold mt-4 block">{t(option.label)}</span>}
          {option.items.map(({ icon, label, href, action, disabled }) => (
            <div
              key={label}
              onClick={href ? () => router.push(href) : action ? actions[action] : undefined}
              className={clsx(
                disabled && "opacity-50",
                "cursor-pointer hover:bg-neutral-100 rounded-md"
              )}
            >
              <div className="flex items-center py-4 px-2">
                <Icon size={0.8} name={icon} className="mr-2 text-neutral-700" />
                <span className="font-bold text-neutral-500">{t(label)}</span>
                <Icon size={0.8} className="ml-auto" name="chevron-right" />
              </div>
            </div>
          ))}
        </Fragment>
      ))}
    </div>
  );
};

export default ProfileOptions;
