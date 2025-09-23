import { useTranslations } from "next-intl";
import Link from "next/link";

import { Mission } from "@/mission/domain/Mission";
import { Icon } from "@/components/ui";

type MissionSheetContactProps = {
  mission?: Mission;
};

export const MissionSheetContact = ({ mission }: MissionSheetContactProps) => {
  const t = useTranslations("mission.contact");

  if (!mission?.contact_email && !mission?.contact_phone) {
    return null;
  }

  return (
    <div className="my-4">
      <h2 className="text-neutral-700 font-bold text-xl mb-2">
        {t("title", { name: mission.contact_name })}
      </h2>
      <span className="w-full flex text-neutral-500 flex-wrap text-nowrap gap-x-1 items-center">
        {/*<p className="font-bold">{t("whatsappAlternative")}</p>*/}
        {mission.contact_phone && (
          <>
            <Icon name="phone" size={0.8} />
            {mission.contact_phone}
          </>
        )}
        {mission.contact_email && (
          <>
            <Icon name="email" size={0.8} />
            {mission.contact_email}
          </>
        )}
      </span>
      <div className="flex space-x-2 mt-2">
        {mission.contact_phone && (
          <Link
            href={`https://wa.me/${mission.contact_phone.replace(/\D/g, "")}`}
            target="_blank"
            className="block bg-green-500 text-white rounded-lg p-4 text-center no-underline flex-1 hover:shadow-lg"
          >
            <span className="text-lg font-bold">{t("whatsappAction")}</span>
            {/*<br />*/}
            {/*<span className="text-sm">{t("whatsappResult")}</span>*/}
          </Link>
        )}
        {mission.contact_email && (
          <Link
            href={`mailto:${mission.contact_email}`}
            className="block border border-gray-300 rounded-lg p-4 text-center no-underline flex-1 hover:shadow-lg bg-white"
          >
            <span className="text-lg font-bold">{t("emailAction")}</span>
            {/*<br />*/}
            {/*<span className="text-sm text-gray-500">{t("emailResult")}</span>*/}
          </Link>
        )}
      </div>
    </div>
  );
};
