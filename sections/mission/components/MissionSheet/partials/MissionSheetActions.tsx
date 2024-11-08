"use client";
import { useMemo } from "react";
import { Loader2 } from "lucide-react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { Mission } from "@/mission/domain/Mission";
import { useUserStore } from "@/user/store/useUserStore";
// import { useAuthModal } from "@/auth/context/AuthModalContext";
import { useFavoriteActions } from "@/mission/application/useFavoriteActions";
import { checkIsFavorite } from "@/mission/utils/checkIsFavorite";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui";

interface MissionSheetActionsProps {
  mission?: Mission;
}

export const MissionSheetActions = ({ mission }: MissionSheetActionsProps) => {
  const t = useTranslations();
  const router = useRouter();
  const { user } = useUserStore();
  // const { openModal } = useAuthModal();
  const { addFavorite, removeFavorite, isLoading } = useFavoriteActions();

  const isFavorite = useMemo(
    () => mission && checkIsFavorite(mission, user?.id),
    [mission, user?.id],
  );

  const toggleFavorite = () => {
    // if (!user?.id) return openModal();
    if (!mission?.id) return;
    isFavorite ? removeFavorite(mission?.id) : addFavorite(mission?.id);
  };

  const onJoin = () => {
    // if (!user?.id) return openModal();
    router.push(`/connections/request/${mission?.id}`);
  };

  return (
    <div className="flex w-full gap-y-2 flex-col">
      <div className="flex flex-row gap-x-2 flex-wrap w-full">
        <Button
          className={clsx(
            "flex-1 border border-rose-500 py-2",
            isFavorite ? "bg-rose-500" : "bg-white",
            isFavorite ? "text-white" : "text-rose-500",
            "hover:bg-rose-200",
          )}
          onClick={toggleFavorite}
        >
          <Icon
            name={isLoading ? null : isFavorite ? "heart" : "heart-outline"}
            size={0.8}
          />
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            t("mission.actions.favorite")
          )}
        </Button>
        <Button
          className="flex-1 bg-green-500 opacity-50 py-2 hover:bg-green-400"
          onClick={() =>
            alert(t("alerts.comingSoon.title"), t("alerts.comingSoon.text"))
          }
        >
          <Icon name="currency-usd" size={0.8} />
          {t("mission.actions.give")}
        </Button>
      </div>
      <Button onClick={onJoin} className="flex-1 py-3">
        <Icon name="handshake" size={0.8} />
        {t("mission.actions.join")}
      </Button>
    </div>
  );
};
